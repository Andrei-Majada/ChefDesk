import { Injectable, BadRequestException } from '@nestjs/common';
import { OrcamentosService } from '../orcamentos/orcamentos.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly orcamentosService: OrcamentosService) {}

  private formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  async generateWhatsapp(quoteId?: string, quoteObj?: any) {
    let quote = quoteObj;

    if (quoteId) {
      quote = await this.orcamentosService.findById(quoteId);
    }

    if (!quote) {
      throw new BadRequestException('Quote not provided or not found');
    }

    const phone = quote.cliente?.whatsapp;
    if (!phone) {
      throw new BadRequestException('Quote has no whatsapp phone');
    }

    const lines: string[] = [];
    lines.push(
      `Olá ${quote.cliente?.nome || ''}, aqui está o resumo do seu orçamento:`,
    );
    lines.push(
      `Data: ${quote.dataEvento ? this.formatDate(new Date(quote.dataEvento)) : ''}`,
    );
    lines.push(`Cidade: ${quote.cidade || ''}`);
    lines.push(`Pessoas: ${quote.qtdPessoas ?? ''}`);

    if (quote.menu) {
      lines.push('Menu selecionado:');
      if (quote.menu.coldStarter)
        lines.push(`- Entrada fria: ${quote.menu.coldStarter}`);
      if (quote.menu.hotStarter)
        lines.push(`- Entrada quente: ${quote.menu.hotStarter}`);
      if (quote.menu.mainCourse)
        lines.push(`- Prato principal: ${quote.menu.mainCourse}`);
      if (quote.menu.dessert) lines.push(`- Sobremesa: ${quote.menu.dessert}`);
    }

    if (quote.valorEstimadoTotal !== undefined) {
      lines.push(`Valor estimado: R$ ${quote.valorEstimadoTotal}`);
    }

    if (quote.pricingBreakdown && Array.isArray(quote.pricingBreakdown)) {
      lines.push('Detalhamento:');
      for (const item of quote.pricingBreakdown) {
        lines.push(`- ${item.label}: R$ ${item.value}`);
      }
    }

    lines.push(
      'Para confirmar ou tirar dúvidas responda aqui ou acesse nosso site.',
    );

    const text = encodeURIComponent(lines.join('\n'));

    // Use wa.me link (no plus) - ensure phone digits only
    const digits = phone.replace(/[^0-9]/g, '');
    const whatsappHref = `https://wa.me/${digits}?text=${text}`;

    return {
      whatsappHref,
      message: lines.join('\n'),
    };
  }
}
