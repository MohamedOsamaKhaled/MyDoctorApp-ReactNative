const profile = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        specialization: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        workingHours: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
    });

    // connect two tables to dynamic create ID and merge data when search
    Profile.associate = models => {
        Profile.belongsTo(models.User)
    }

    return Profile;
}


export default profile;