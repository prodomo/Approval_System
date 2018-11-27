<template>
    <date-picker v-model="time" type="datetime" :disabled="disabled" :lang="lang" width="100%" format="YYYY-MM-DD HH:mm" :minute-step="1"></date-picker>
</template>

<script>
    import moment from 'moment';
    import DatePicker from 'vue2-datepicker';

    export default {
        name: "DatetimePicker",
        components: {DatePicker},
        props: {
            value: {
                type: [String]
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value(newVal) {
                if(newVal)
                    this.time = moment(newVal).toDate();
                else
                    this.time = null;
            },
            time(newVal) {
                if(newVal)
                    this.$emit('input', moment(newVal).local().format('YYYY-MM-DD HH:mm:ss'));
                else
                    this.$emit('input', null);
            }
        },
        data() {
            return {
                lang: {
                    days: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
                    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    pickers: ['後七天', '下一個三十天', '前七天', '前三十天'],
                    placeholder: {
                        date: '請選擇日期時間',
                        dateRange: '請選擇日期範圍'
                    }
                },
                time: this.value ? moment(this.value).toDate() : null
            };
        }
    }
</script>