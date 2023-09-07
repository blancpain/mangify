import { app } from './app';
import { PORT } from '@/config';
import { Logger } from '@/lib';

app.listen(PORT, () => {
  Logger.debug(`Server listening on port ${PORT}`);
});
