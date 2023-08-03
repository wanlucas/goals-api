// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const entity = process.argv[2];
const entityName = entity.charAt(0).toUpperCase() + entity.slice(1);

const routerTemplate = `
import express from 'express';
import ${entityName}Controller from '../controller/${entityName}Controller';

const router = express.Router();

router.get('/:id', ${entityName}Controller.findById);
router.post('/', ${entityName}Controller.create);

export default router;
`;

fs.writeFileSync(`./src/application/router/${entity}Router.ts`, routerTemplate);

const controllerTemplate = `
import ${entity}UseCase from '../../domain/useCase/${entity}UseCase';
import { Request, Response } from 'express';
     
export default class ${entityName}Controller {
  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const output = await ${entity}UseCase.findById(id);

    return res.status(200).json(output);
  }

  static async create(req: Request, res: Response) {
    const output = await ${entity}UseCase.create(req.body);
    return res.status(201).json(output);
  }
}
`;

fs.writeFileSync(`./src/application/controller/${entityName}Controller.ts`, controllerTemplate);

const entityTemplate = `
import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const ${entity}Schema = Joi.object({
  id: Joi.string().uuid(),
});

export interface I${entityName} extends IEntity {}

export default class ${entityName} extends Entity {
  public constructor (body: I${entityName}) {
    super(body, ${entity}Schema);
  }
}
`;

fs.writeFileSync(`./src/domain/entity/${entityName}.ts`, entityTemplate);

fs.mkdirSync(`./src/domain/useCase/${entity}UseCase`);

const createUseCaseTemplate = `
import ${entityName}, { I${entityName} } from '../../entity/${entityName}';
import ${entity}Model from '../../../infra/model/${entity}Model';

export default class Create {
  public async execute(body: I${entityName}) {
    const ${entity} = new ${entityName}(body);
    await ${entity}Model.create(${entity});
  }
}
`;

fs.writeFileSync(`./src/domain/useCase/${entity}UseCase/Create.ts`, createUseCaseTemplate);

const findByIdUseCaseTemplate = `
import ${entityName}, { I${entityName} } from '../../entity/${entityName}';
import ${entity}Model from '../../../infra/model/${entity}Model';

export default class FindById {
  public async execute(id: string): Promise<${entityName}> {
    const payload = await ${entity}Model.findById(id);
    return new ${entityName}(payload);
  }
}
`;

fs.writeFileSync(`./src/domain/useCase/${entity}UseCase/FindById.ts`, findByIdUseCaseTemplate);

const useCaseIndexTemplate = `
import ${entityName} from '../../entity/${entityName}';
import Create from './Create';
import FindById from './FindById';

class ${entityName}UseCase {
  constructor(
    public findById: (id: string) => Promise<${entityName}>,
    public create: (body: any) => Promise<void>,
  ) { }
}

export default new ${entityName}UseCase(
  new FindById().execute,
  new Create().execute,
);
`;

fs.writeFileSync(`./src/domain/useCase/${entity}UseCase/index.ts`, useCaseIndexTemplate);

fs.mkdirSync(`./src/infra/model/${entity}Model`);

const createModelTemplate = `
import ${entityName} from '../../../domain/entity/${entityName}';
import knex from '../../db/config';

export default class Create {
  static async execute(${entity}: ${entityName}) {
    await knex('${entityName}')
      .insert(${entity});
  }
}
`;

fs.writeFileSync(`./src/infra/model/${entity}Model/Create.ts`, createModelTemplate);

const findByIdModelTemplate = `
import ${entityName} from '../../../domain/entity/${entityName}';
import knex from '../../db/config';
  
export default class FindById {
  static async execute(id: string): Promise<${entityName}> {
    return knex('${entityName}')
      .select('*')
      .where({ id })
      .first();
  }
}
`;

fs.writeFileSync(`./src/infra/model/${entity}Model/FindById.ts`, findByIdModelTemplate);

const indexModelTemplate = `
import ${entityName} from '../../../domain/entity/${entityName}';
import FindById from './FindById';
import Create from './Create';

class ${entityName}Model {
  constructor(
    public findById: (id: string) => Promise<${entityName}>,
    public create: (${entity}: ${entityName}) => Promise<void>,
  ) { }
}

export default new ${entityName}Model(
  FindById.execute,
  Create.execute,
);
`;

fs.writeFileSync(`./src/infra/model/${entity}Model/index.ts`, indexModelTemplate);
