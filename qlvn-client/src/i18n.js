import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.prototype.$_lenguage = 'en'
function loadLocaleMessages () {
    const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
        }
    })
    return messages
}
const i18n = new VueI18n({
    locale: Vue.prototype.$_lenguage || 'en',
    fallbackLocale: Vue.prototype.$_lenguage || 'en',
    messages: loadLocaleMessages()
})

export default i18n
