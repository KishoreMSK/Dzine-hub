<template>
    <HeaderComponent />
    <div class="card">
        <CardComponent v-for="user in usersList" :key="user.id" :user="user" />
    </div>
    <div class="pagination">
        <PaginationComponent v-if="this.totalPages > 0" :length="totalPages" @changePage="changePage" />
    </div>
</template>

<script src="./UserComponent.js"/>

<style scoped>
.card {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin-top: 2%;
}

.pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>