import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeadDto } from './dto/create-lead.dto';
import { FindLeadsQueryDto } from './dto/find-leads-query.dto';
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

  async findAll(filters: FindLeadsQueryDto) {
    const query: Record<string, any> = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }

    if (filters.phone) {
      query.phone = { $regex: filters.phone, $options: 'i' };
    }

    if (filters.source) {
      query.source = { $regex: filters.source, $options: 'i' };
    }

    if (filters.lgpdConsent !== undefined) {
      query.lgpdConsent = filters.lgpdConsent;
    }

    if (filters.createdAtFrom || filters.createdAtTo) {
      query.createdAt = {};

      if (filters.createdAtFrom) {
        query.createdAt.$gte = new Date(filters.createdAtFrom);
      }

      if (filters.createdAtTo) {
        query.createdAt.$lte = new Date(filters.createdAtTo);
      }
    }

    return this.model.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    const lead = await this.model.findById(id).exec();

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  async findByPhone(phone: string) {
    return this.model.findOne({ phone }).exec();
  }
}
