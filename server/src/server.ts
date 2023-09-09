import { app } from './app';
import { PORT } from '@/config';
import { Logger } from '@/lib';

app.listen(PORT, () => {
  Logger.debug(`Server up and running, listening on port ${PORT}`);
});
