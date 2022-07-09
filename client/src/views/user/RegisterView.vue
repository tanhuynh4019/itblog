<template>
    <div v-if="!user">
        <center>
            <div style="width: 400px;">
                <RegisterComponent class="mt-5" :website="website" :user="user" @userEmit="user = $event" @showSnackbar="snackbar = $event"/>
            </div>
        </center>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RegisterComponent from '../../components/Auth/Register.vue';

export default Vue.extend({
    name: 'Register',
    props: ['website', 'user'],
    data: () => ({
        snackbar: {}
    }), 
    watch: {
        user(){
            this.$emit('userEmit', this.user)
        },
        snackbar(){
            this.$emit('showSnackbar', this.snackbar)
        }
    },
    components: {
        RegisterComponent
    }
})
</script>
