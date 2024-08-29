import { Router } from 'express';
import MeasureController from '../controllers/measure.controller';
import MeasureService from '../services/measure.service';
import MeasureRepositoryImpl from '../repositories/measureRepositoryImpl';
import validationHandler from '../middlewares/validationHandler';
import { checkSchema, body } from 'express-validator';
import MeasureType from '../models/measureType.enum';
import AiServiceImpl from '../services/aiServiceImpl.service';

const router = Router();
const measureController = new MeasureController(new MeasureService(
    new MeasureRepositoryImpl(), new AiServiceImpl()
));

router.post(
  '/upload',
  checkSchema({
    image: {
      isBase64: {
        errorMessage: 'Atributo image deve ser uma string na base64'
      },
      notEmpty: {
        errorMessage: 'Atributo image não deve estar vazio'
      }
    },
    customer_code: {
      notEmpty: {
        errorMessage: 'Atributo customer_code não deve estar vazio'
      }
    },
    measure_datetime: {
      isISO8601: {
        errorMessage: 'Atributo measure_datetime deve ser uma data válida no formato ISO 8601'
      },
      notEmpty: {
        errorMessage: 'Atributo measure_datetime não deve estar vazio'
      }
    },
    measure_type: {
      notEmpty: {
        errorMessage: 'Atributo measure_type não deve estar vazio'
      }
    }
  }),
  body('measure_type', 'Atributo measure_type deve ser um valor válido').isIn(Object.values(MeasureType)),
  validationHandler,
  measureController.upload
);
router.patch(
  '/confirm',
  checkSchema({
    measure_uuid: {
      isUUID: {
        errorMessage: 'Atributo measure_uuid deve ser um UUID válido'
      },
      notEmpty: {
        errorMessage: 'Atributo measure_uuid não deve estar vazio'
      }
    },
    confirmed_value: {
      isInt: {
        errorMessage: 'Atributo confirmed_value deve ser um número'
      },
      notEmpty: {
        errorMessage: 'Atributo confirmed_value não deve estar vazio'
      }
    }
  }),
  validationHandler,
  measureController.confirm
);
router.get(
  '/:customerCode/list',
  measureController.list
);

export default router;