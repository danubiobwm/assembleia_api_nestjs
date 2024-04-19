import { Controller, Res, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { Response } from 'express';
import { PeopleService } from './people.service';
import { Person } from './person';
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@Controller('people')
@ApiTags('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Get()
  @ApiOperation({ description: 'Criar User' })
  list(@Res() response: Response) {
    const list = this.peopleService.list();
    return response.status(200).send(list);
  }

  @Get('/:id')
  getById(@Param('id') id: number, @Res() response: Response) {
    const person = this.peopleService.findById(id);
    if (!person) {
      return response.status(404).send('Person not found');
    }
    return response.status(200).json(person);
  }

  @Post()
  create(@Res() response: Response, @Body() person: Person) {
    this.peopleService.save(person);
    return response.status(201).send(person);
  }


  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() personUpdateData: Person,
    @Res() response: Response) {

    const person = this.peopleService.findById(id);
    if (!person) {
      return response.status(404).send('Person not found');
    }
    person.name = personUpdateData.name;
    return response.status(200).send('Person atualizado com sucesso!');
  }


  @Delete('/:id')
  delete(@Param('id') id: number, @Res() response: Response) {
    const person = this.peopleService.findById(id);
    if (!person) {
      return response.status(404).send('Person not found');
    }
    this.peopleService.delete(id);
    return response.status(200).send('Person deletado com sucesso!');
}
}
