<template>
    <div v-if="!user">
        <center>
            <RegisterComponent class="mt-5" :website="website" :user="user" />
        </center>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RegisterComponent from '../../components/Auth/Register.vue';

export default Vue.extend({
    name: 'Register',
    props: ['website', 'user'],
    components: {
        RegisterComponent
    }
})
</script>
