import librosRouter from "./librosRouter.js";
import userRouter from "./userRouter.js";
import etapaRouter from "./etapaRouter.js";
import autorRouter from "./autorRouter.js";

const routerAPI = ( app) => {
    app.use('/libros', librosRouter);
    app.use('/etapa', etapaRouter);
    app.use('/autor', autorRouter);
    app.use('/users', userRouter);
}

export default routerAPI;