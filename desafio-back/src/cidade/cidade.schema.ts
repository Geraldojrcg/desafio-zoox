import * as mongoose from 'mongoose';

export const CidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estado'
    },
}, {
    timestamps: {
        createdAt: 'dataCriacao',
        updatedAt: 'dataUltimaAlteracao',
    }
});

CidadeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

CidadeSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 