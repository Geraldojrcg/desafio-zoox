import * as mongoose from 'mongoose';

export const EstadoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    abreviacao: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: 'dataCriacao',
        updatedAt: 'dataUltimaAlteracao',
    }
});

EstadoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

EstadoSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 