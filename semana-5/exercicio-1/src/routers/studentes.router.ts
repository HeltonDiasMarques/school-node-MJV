import { Request, Response, Router } from "express";
import StudentsService from "../services/stundets.service";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const students = await StudentsService.getAll();
    res.send(students);
});

router.get('/:document', async (req: Request, res: Response) => {
    const student = await StudentsService.getByDocument(req.params.document);
    if (!student) return res.status(400).send({ message: 'Estudante não encontrado!' });
    res.status(200).send(student);
});

router.post('/', async(req: Request, res: Response) => {
    if (req.body.age < 18) {
        return res.status(400).send({ message: 'Estudante não foi criado pois não tem a idade mínima(18 anos).' });
    }
    await StudentsService.create(req.body);
    res.status(201).send({ message: 'Estudante cadastrado' });
});

router.delete('/remove/:document', async (req: Request, res: Response) => {
    try {
        await StudentsService.remove(req.params.document);
        res.status(200).send({ message: "Estudante removido com sucesso!" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }

});

router.put('/:document', async (req: Request, res: Response) => {
    try {
       await StudentsService.update(req.params.document, req.body);
        res.status(200).send({ message: "Estudante atualizado com sucesso!" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }

});

export default router;