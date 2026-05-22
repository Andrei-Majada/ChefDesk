import { StatusOrcamento } from '../../orcamentos/schemas/orcamento.schema';
import { OrcamentoInput } from '../../orcamentos/types/orcamento-input.type';

type DraftData = {
  guests?: number;
  totalCost?: number;
  lead?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  event?: {
    kitchenItems?: string[];
    hasDecoration?: boolean;
    waiterCount?: number;
    waiterCost?: number;
    dietaryRestrictions?: string[];
    dietaryNotes?: string;
    date?: string;
    shift?: string;
    city?: string;
    neighborhood?: string;
    locationType?: string;
    occasion?: string;
    hasDietaryRestrictions?: boolean;
  };
  menu?: {
    coldStarter?: string;
    hotStarter?: string;
    mainCourse?: string;
    dessert?: string;
  };
  upsell?: {
    proteinUpgrade?: boolean;
    duplicateDish?: boolean;
    additionalTime?: boolean;
    duplicateCategory?: string;
  };
};

export function mapDraftDataToOrcamento(data: DraftData): OrcamentoInput {
  return {
    cliente: {
      nome: data.lead?.name ?? '',
      whatsapp: data.lead?.phone ?? '',
      email: data.lead?.email,
    },
    dataEvento: new Date(data.event?.date ?? new Date()),
    turno: data.event?.shift,
    cidade: data.event?.city ?? '',
    bairro: data.event?.neighborhood,
    tipoLocal: data.event?.locationType ?? '',
    qtdPessoas: data.guests ?? 0,
    ocasiao: data.event?.occasion,
    estruturaCozinha: data.event?.kitchenItems ?? [],
    restricoesAlimentares: {
      possuiRestricoes: data.event?.hasDietaryRestrictions ?? false,
      itens: data.event?.dietaryRestrictions ?? [],
      observacoes: data.event?.dietaryNotes,
    },
    menu: {
      coldStarter: data.menu?.coldStarter,
      hotStarter: data.menu?.hotStarter,
      mainCourse: data.menu?.mainCourse,
      dessert: data.menu?.dessert,
    },
    personalizacaoServico: {
      temDecoracao: data.event?.hasDecoration ?? false,
      qtdGarcons: data.event?.waiterCount ?? 1,
      custoGarcons: data.event?.waiterCost ?? 0,
      mudouProteina: data.upsell?.proteinUpgrade ?? false,
      duplicarPrato: data.upsell?.duplicateDish ?? false,
      tempoAdicional: data.upsell?.additionalTime ?? false,
      categoriaDuplicada: data.upsell?.duplicateCategory,
    },
    valorEstimadoTotal: data.totalCost ?? 0,
    status: StatusOrcamento.NOVO,
    origem: 'site',
  };
}
