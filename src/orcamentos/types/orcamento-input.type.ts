import { StatusOrcamento } from '../schemas/orcamento.schema';

export type OrcamentoInput = {
  cliente: {
    nome: string;
    whatsapp: string;
    email?: string;
  };
  dataEvento: Date;
  turno?: string;
  cidade: string;
  bairro?: string;
  tipoLocal: string;
  qtdPessoas: number;
  ocasiao?: string;
  estruturaCozinha: string[];
  restricoesAlimentares: {
    possuiRestricoes: boolean;
    itens: string[];
    observacoes?: string;
  };
  menu: {
    coldStarter?: string;
    hotStarter?: string;
    mainCourse?: string;
    dessert?: string;
  };
  personalizacaoServico: {
    temDecoracao: boolean;
    qtdGarcons: number;
    custoGarcons: number;
    mudouProteina: boolean;
    duplicarPrato: boolean;
    tempoAdicional: boolean;
    categoriaDuplicada?: string;
  };
  valorEstimadoTotal: number;
  baseCost?: number;
  extrasCost?: number;
  pricingBreakdown?: { label: string; value: number }[];
  status: StatusOrcamento;
  origem: string;
};
