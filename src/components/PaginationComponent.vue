<template>
    <div class="page">
        <svg-icon v-if="pageNo !== 1" type="mdi" :path="left" @click="prevPage" class="prev_page"></svg-icon>
        <v-pagination v-model="pageNo" class="my-4" :length="length" rounded="circle"></v-pagination>
        <svg-icon v-if="pageNo !== length" type="mdi" :path="right" @click="nextPage" class="next_page"></svg-icon>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
export default {
    name: 'PaginationComponent',
    components: {
        SvgIcon
    },
    data() {
        return {
            pageNo: 1,
            left: mdiChevronLeft,
            right: mdiChevronRight
        }
    },
    props: {
        length: Number,
    },
    watch: {
        pageNo: {
            handler(newValue, oldValue) {
                this.movePage()
            }
        }
    },
    methods: {
        movePage() {
            this.$emit('changePage', this.pageNo)
        },
        prevPage() {
            console.log(this.pageNo);
            if (this.pageNo > 1) {
                this.pageNo -= 1;
                this.$emit('changePage', this.pageNo)
            }
        },
        nextPage() {
            console.log(this.pageNo);
            if (this.pageNo < this.length) {
                this.pageNo += 1;
                this.$emit('changePage', this.pageNo)
            }
        }
    }
}
</script>

<style>
.page {
    /* background-color: rgb(199, 196, 196); */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

li.v-pagination__prev {
    display: none;
}

li.v-pagination__next {
    display: none;
}

.prev_page,
.next_page {
    cursor: pointer;
}
</style>