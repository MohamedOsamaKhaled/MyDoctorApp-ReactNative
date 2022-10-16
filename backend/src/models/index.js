import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'postgres',
    }
);


const models = {
    User: sequelize.import('./user'),
    Profile: sequelize.import('./profile'),
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
})

// Connection Status
sequelize.authenticate()
    .then(() => {
        console.log('Connection Successed');
    })
    .catch(err => {
        console.log('Connection Failed', err);
    })


export { sequelize };
export default models;
