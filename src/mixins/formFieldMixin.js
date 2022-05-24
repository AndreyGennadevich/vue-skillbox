import BaseFormField from "@/components/BaseFormField";

    export default {
        components: { BaseFormField },
        props: {
            title: {
                type: String,
                required: true,
            },
            error: {
                default: null,
                type: String,
            },
            placeholder: {
                type: String,
                required: true,
            },
            modelValue: {
                default: '',
                type: String,
            },
        },
        computed: {
            dataValue: {
                get() {
                    return this.modelValue;
                },
                set(value) {
                    this.$emit('update:modelValue', value);
                }
            }
        }
    }