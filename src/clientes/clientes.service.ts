import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente, ClienteDocument } from './schemas/cliente.schema';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel(Cliente.name)
    private readonly clienteModel: Model<ClienteDocument>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const cliente = await this.clienteModel.create(createClienteDto);

    return this.toResponse(cliente);
  }

  async findAll() {
    const clientes = await this.clienteModel.find().sort({ nome: 1 }).exec();

    return {
      data: clientes.map((cliente) => this.toResponse(cliente)),
    };
  }

  async findOne(id: string) {
    this.validateObjectId(id);

    const cliente = await this.clienteModel.findById(id).exec();

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return this.toResponse(cliente);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    this.validateObjectId(id);

    const cliente = await this.clienteModel
      .findByIdAndUpdate(id, updateClienteDto, {
        new: true,
      })
      .exec();

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return this.toResponse(cliente);
  }

  async remove(id: string) {
    this.validateObjectId(id);

    const cliente = await this.clienteModel.findByIdAndDelete(id).exec();

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return {
      message: 'Cliente removido com sucesso',
    };
  }

  private toResponse(cliente: ClienteDocument) {
    return {
      id: cliente._id.toString(),
      nome: cliente.nome,
      email: cliente.email,
      whatsapp: cliente.whatsapp,
      cep: cliente.cep,
      endereco: cliente.endereco,
    };
  }

  private validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido');
    }
  }
}
