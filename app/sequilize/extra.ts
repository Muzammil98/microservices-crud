import { Sequelize } from "sequelize";

function applyExtraSetup(sequelize: Sequelize) {
	const { instrument, orchestra } = sequelize.models;

	orchestra.hasMany(instrument);
	instrument.belongsTo(orchestra);
}

export default applyExtraSetup 