import { Router, type IRouter } from "express";
import healthRouter from "./health";
import buscaRouter from "./busca";
import produtosRouter from "./produtos";
import lojasRouter from "./lojas";
import favoritosRouter from "./favoritos";
import categoriasRouter from "./categorias";

const router: IRouter = Router();

router.use(healthRouter);
router.use(buscaRouter);
router.use(produtosRouter);
router.use(lojasRouter);
router.use(favoritosRouter);
router.use(categoriasRouter);

export default router;
