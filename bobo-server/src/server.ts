import app from './app';
import { connectDB } from './config/database';
import { hook } from './config/hook';

(async () => {
    await connectDB();

    await hook();

    const server = app.listen(app.get('port'), '0.0.0.0', () => {
        console.log(
            '  App is running at http://localhost:%d in %s mode',
            app.get('port'),
            app.get('env'),
        );
        console.log('  Press CTRL-C to stop\n');
    });
})();
