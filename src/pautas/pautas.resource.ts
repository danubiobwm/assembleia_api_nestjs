import { Pauta } from "./pauta.entity";


export class CriarPautaResource{
  descricao: string;
}

export function toDomain(resource: CriarPautaResource ): Pauta{
  return {
    descricao: resource.descricao
  };
}