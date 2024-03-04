import { Injectable } from '@nestjs/common';
import { Person } from './person';

@Injectable()
export class PeopleService {

  people: Person[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
    { id: 3, name: "Smith" },
  ];

  list(): Person[] {
    return this.people;
  }

  save(person: Person) {
    this.people.push(person);
  }

  findById(id: number): Person {
    return this.people.find(
      person => person.id == id
    );
  }

  update(id: number, updatePerson: Person) {
    this.people.forEach(
      person => {
        if (person.id == id) {
          person.name = updatePerson.name;
        }
      }
    );
  }

  delete(id: number) {
    const newList = this.people.filter(
      person => person.id != id
    );
    this.people = newList;
  }
}
