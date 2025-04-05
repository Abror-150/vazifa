import express from 'express';

import categroyRoutes from './routes/categroy.routes.js';
import productRoute from './routes/product.routes.js';
import userRoute from './routes/user.routes.js';
import sesionsRoute from './routes/sesions.routes.js';
import { swaggerDocs, swaggerUi } from './swagger.js';

let app = express();
app.use(express.json());
app.use('/categories', categroyRoutes);

app.use('/products', productRoute);
app.use('/user', userRoute);
app.use('/session', sesionsRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(3000, () => {
  console.log('Server Started..');
});
