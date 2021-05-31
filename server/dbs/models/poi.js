import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Poi = new Schema({
    name:{
        type:String // 景点名称
    },
    province:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    areaCode:{
        type:String
    },
    tel:{
        type:String
    },
    area:{
        type:String
    },
    addr:{
        type:String
    },
    type:{ // 丽人、景点、餐饮、美食
        type:String
    },
    module:{
        type:String
    },
    longitude:{
        type:Number
    },
    latitude:{
        type:Number
    }
})

export default mongoose.model('Poi', Poi)