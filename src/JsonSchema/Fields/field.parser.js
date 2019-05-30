import ObjectField from './ObjectField';
import ArrayField from './ArrayField';
import StringField from './StringField.vue';
import NumberField from './NumberField.vue';
import BooleanField from './BooleanField.vue';

const typeParser = {
    object: ObjectField,
    string: StringField,
    number: NumberField,
    boolean: BooleanField,
    array: ArrayField
}

export const getTargetFieldBySchema = (type) => {
    console.log(type);
    let _view = typeParser[type];
    if (!_view) throw `schema type error`;
    return _view;
}
