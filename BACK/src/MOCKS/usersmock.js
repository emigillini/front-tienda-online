import {faker} from "@faker-js/faker"

export const generarusuarioSimulado = () => {
    return {
      
        first_name : faker.person.firstName(),
        last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age : 20,
      role : "usuario"
    };
  };

