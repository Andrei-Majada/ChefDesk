import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead, LeadDocument } from './schemas/lead.schema';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name) private readonly model: Model<LeadDocument>,
  ) {}

  async create(dto: CreateLeadDto) {
    if (!dto.lgpdConsent) {
      throw new BadRequestException('LGPD consent is required to create lead');
    }

    const lead = await this.model.create({
      name: dto.name,
      phone: dto.phone,
      lgpdConsent: dto.lgpdConsent,
      source: dto.source,
    });

    return { id: lead._id.toString() };
  }

  async update(id: string, dto: UpdateLeadDto) {
    const lead = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!lead) throw new NotFoundException('Lead not found');

    return { id: lead._id.toString() };
  }

  async findByPhone(phone: string) {
    return this.model.findOne({ phone }).exec();
  }
}
