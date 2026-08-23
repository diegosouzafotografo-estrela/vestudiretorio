import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Fornecedor {
  id: string;
  nome: string;
  descricao: string;
  polo: 'bras' | 'bom-retiro' | '25-de-marco' | 'outro';
  cnpj: string;
  aceita_cpf: boolean;
  whatsapp: string;
  instagram?: string;
  moq: number;
  produtos: string[];
  faixa_preco: '$' | '$$' | '$$$' | '$$$$';
  foto_perfil: string;
  premium: boolean;
  data_atualizacao: string;
}

export interface Filtros {
  polo?: string[];
  moq_max?: number;
  aceita_cpf?: boolean;
  produtos?: string[];
  faixa_preco?: string[];
  busca?: string;
}

// Funções de busca
export async function buscarFornecedores(filtros: Filtros = {}): Promise<Fornecedor[]> {
  let query = supabase
    .from('fornecedores')
    .select('*')
    .eq('ativo', true);

  // Filtro por polo
  if (filtros.polo && filtros.polo.length > 0) {
    query = query.in('polo', filtros.polo);
  }

  // Filtro por MOQ máximo
  if (filtros.moq_max) {
    query = query.lte('moq', filtros.moq_max);
  }

  // Filtro por aceita CPF
  if (filtros.aceita_cpf !== undefined) {
    query = query.eq('aceita_cpf', filtros.aceita_cpf);
  }

  // Filtro por produtos
  if (filtros.produtos && filtros.produtos.length > 0) {
    query = query.overlaps('produtos', filtros.produtos);
  }

  // Filtro por faixa de preço
  if (filtros.faixa_preco && filtros.faixa_preco.length > 0) {
    query = query.in('faixa_preco', filtros.faixa_preco);
  }

  // Busca textual
  if (filtros.busca) {
    query = query.or(`nome.ilike.%${filtros.busca}%,descricao.ilike.%${filtros.busca}%`);
  }

  // Ordenar: premium primeiro, depois por nome
  query = query.order('premium', { ascending: false })
              .order('nome', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar fornecedores:', error);
    return [];
  }

  return data || [];
}

export async function buscarFornecedorPorId(id: string): Promise<Fornecedor | null> {
  const { data, error } = await supabase
    .from('fornecedores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar fornecedor:', error);
    return null;
  }

  return data;
}

export async function registrarEvento(
  fornecedorId: string,
  evento: 'view' | 'whatsapp_click' | 'filter_apply' | 'search',
  metadata?: Record<string, unknown>
): Promise<void> {
  const { error } = await supabase
    .from('analytics')
    .insert({
      fornecedor_id: fornecedorId,
      evento,
      metadata
    });

  if (error) {
    console.error('Erro ao registrar evento:', error);
  }
}
