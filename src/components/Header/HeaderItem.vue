<template>
    <header>
        <div class="row">
            <div class="col-4">
                <img class="header-logo" src="@/assets/images/fysiofresh-logo-text.png">
            </div>
            <div class="col-2">
                <nav>
                    <router-link to="/">Home</router-link>
                </nav>
            </div>
            <div class="col-2">
                <nav>
                    <router-link to="/board">Board</router-link>
                </nav>
            </div>
        </div>
    </header>
    <router-view />
</template>

<script lang="ts">
export default {
    name: 'HeaderItem',
}
</script>

<style scoped>
header {
    position: sticky;
    width: 100vw;
    background-color: hsla(var(--white-hsl), 1);
    height: 90px;
}

nav {
    padding-top: 1.4em;
}

nav a {
    font-size: x-large;
    text-decoration: none;
    color: hsla(var(--darkAccent-hsl), 1);
    padding-left: 3em;
}

nav a.router-link-exact-active {
    font-family: 'Work Sans', sans-serif;
    text-decoration: underline;
}

.header-logo {
    width: 200px;
    margin-left: 1.2rem;
    padding-top: 1.4rem;
}
</style>