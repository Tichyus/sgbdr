<template>
    <div>
        <div class="d-flex justify-content-between" style="margin-bottom: 2rem">
            <div><button @click="offsetDown">Previous</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button @click="offsetUp">Next</button>
            </div>
            <div>
                Per page :
                <input @change="updatelimit" v-model="limitTemp" :placeholder="limitTemp">
            </div>
            <div>
                Sort by :
                <select @change="setFilter" v-model="selected">
                    <option v-for="option in options" v-bind:value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </div>
        <b-table ref="table" striped hover :items="result"></b-table>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import {SET_LIMIT, SET_OFFSET, SET_ORDER_BY} from "../store/films/mutationTypes";

export default {
    name: "TableBoot",
    data() {
        return {
            limitTemp: 10,
            selected: 'A',
            options: [
                { text: 'Title', value: 'A' },
                { text: 'Rating', value: 'B' },
            ]
        }
    },

    created(){
        this.setFilms();
    },

    computed: {
        ...mapState('films', ['orderBy', 'limit', 'offset', 'result', 'total']),

        currentPage() {
            return Math.ceil(this.offset / this.limit) + 1;
        },
        totalPages() {
            return Math.ceil(this.total / this.limit);
        },
    },

    methods: {
        ...mapMutations('films', [SET_ORDER_BY, SET_LIMIT, SET_OFFSET]),
        ...mapActions('films', ['getFilms']),

        async setFilms() {
            return await this.getFilms();
        },

        updatelimit(){
            this[SET_LIMIT](parseInt(this.limitTemp));
            this[SET_OFFSET](0);

            this.getFilms();
        },

        setFilter() {
            if (this.selected === 'A') {
                this.sortByTitle();
            }
            else{
                this.sortByGenre()
            }
        },

        sortByTitle(){
            // this.orderBy == 'query1.title asc'
            this[SET_ORDER_BY]('title')

            this.setFilms();
        },

        sortByGenre(){
            // this.orderBy == 'query1.name asc' ?
            this[SET_ORDER_BY]('rating')
                // this[SET_ORDER_BY]('query1.rating asc');

            this.setFilms();
        },

        sortByRental(){
            this.orderBy == 'query2.count asc' ?
                this[SET_ORDER_BY]('query2.count desc') :
                this[SET_ORDER_BY]('query2.count asc');

            this.setFilms();
        },

        offsetUp(){
            if(this.offset + this.limit < this.total) {
                this[SET_OFFSET](this.offset + this.limit);

                this.getFilms();
            }
        },

        offsetDown(){
            if (this.offset - this.limit >= 0) {
                this[SET_OFFSET](this.offset - this.limit);

                this.getFilms();
            }
            else {
                this[SET_OFFSET](0);

                this.getFilms();
            }
        },
    }
}
</script>

<style scoped>

</style>
