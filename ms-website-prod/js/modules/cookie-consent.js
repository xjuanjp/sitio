import '../lib/cookieconsent.js';
import { initAnalytics } from './firebase.js';

// obtain plugin
export const cookieConsent = initCookieConsent();

// run plugin with your configuration
cookieConsent.run({
    current_lang: 'en',
    autoclear_cookies: true,                   // default: false
    page_scripts: true,                        // default: false

    // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
    // delay: 0,                               // default: 0
    // auto_language: null                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                          // default: true
    // force_consent: false,                   // default: false
    // hide_from_bots: false,                  // default: false
    // remove_cookie_tables: false             // default: false
    // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
    // cookie_expiration: 182,                 // default: 182 (days)
    // cookie_necessary_only_expiration: 182   // default: disabled
    // cookie_domain: location.hostname,       // default: current domain
    // cookie_path: '/',                       // default: root
    // cookie_same_site: 'Lax',                // default: 'Lax'
    // use_rfc_cookie: false,                  // default: false
    // revision: 0,                            // default: 0

    onFirstAction: function(user_preferences, cookie){
        // callback triggered only once
    },

    onAccept: function (cookie) {
        initAnalytics(cookieConsent);
    },

    onChange: function (cookie, changed_preferences) {
        initAnalytics(cookieConsent);
        console.log(changed_preferences)
    },

    languages: {
        'en': {
            consent_modal: {
                title: 'We use cookies',
                description: 'We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
                primary_btn: {
                    text: 'Accept all',
                    role: 'accept_all'              // 'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Reject all',
                    role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                }
            },
            settings_modal: {
                title: 'Cookie preferences',
                save_settings_btn: 'Save settings',
                accept_all_btn: 'Accept all',
                reject_all_btn: 'Reject all',
                close_btn_label: 'Close',
                cookie_table_headers: [
                    {col1: 'Name'},
                    {col2: 'Domain'},
                    {col3: 'Expiration'},
                    {col4: 'Description'}
                ],
                blocks: [
                    {
                        title: 'Cookie usage',
                        description: 'We use cookies to ensure that we give you the best experience on our website. If you continue without changing your settings, we’ll assume that you are happy to receive all the cookies on Making Sense website. However, if you would like to, you can change your cookie settings at any time.'
                    }, {
                        title: 'Necessary Cookies',
                        description: 'These cookies are essential in order to enable you to move around the site and use its features, such as accessing secure areas of the site. Without these cookies, services you have asked for cannot be provided.',
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                        }
                    }, {
                        title: 'First party analytics cookies',
                        description: 'These cookies allow us to employ data analytics so we can measure and improve the performance of our site and provide more relevant content to you. These cookies don`t collect information that identifies a visitor down to an individual level that is available to us. These cookies are not passing personally identifiable information to any external third party other than in limited cases when we engage a service provider to act on our behalf but who is then unable to use the data for their own purposes. These include, Adobe’s Analytics, Target and Audience Manager; Contentsquare and Demandbase.',
                        toggle: {
                            value: 'analytics',     // your cookie category
                            enabled: true,
                            readonly: false
                        },
                    }, {
                        title: 'Performance cookies',
                        description: 'Performance cookies are generally third-party cookies from vendors we work with or who work on our behalf that collect information about your visit and use of the Making Sense website, for instance which pages you visit the most often, and if you get error messages from web pages. These cookies don`t collect information that identifies a visitor. All information these cookies collect is anonymous and is only used to improve how the website works. Third party vendors may have access to this data and may use it to improve their overall services and offerings.',
                        toggle: {
                            value: 'performance',     // your cookie category
                            enabled: true,
                            readonly: false
                        },
                    }, {
                        title: 'Functionality cookies',
                        description: 'These cookies allow a site to remember choices you make (such as your username, language or the region you are in) and provide more enhanced, personal features. These cookies cannot track your browsing activity on other websites. They don’t gather any information about you that could be used for advertising or remembering where you’ve been on the Internet outside our site.',
                        toggle: {
                            value: 'functionality',
                            enabled: true,
                            readonly: false
                        }
                    }, {
                        title: 'Advertising and social media cookies',
                        description: 'Advertising and social media cookies (including web beacons and other tracking and storage technologies) are used to (1) deliver advertisements more relevant to you and your interests; (2) limit the number of times you see an advertisement; (3) help measure the effectiveness of the advertising campaign; (4) retargeting to Making Sense websites/information and (5) understand people’s behavior after they view an advertisement. They are usually placed on behalf of advertising networks with the site operator’s permission. They remember that you have visited a site and quite often they will be linked to site functionality provided by the other organization. This may impact the content and messages you see on other websites you visit.',
                        toggle: {
                            value: 'targeting',
                            enabled: true,
                            readonly: false
                        }
                    }, {
                        title: 'More information',
                        description: 'If you have questions about this <a href="./assets/dwn/Cookie-Policy.pdf" target="_blank" class="cc-link">Cookie Policy</a>, please contact us at <a href="mailto:privacy@makingsense.com" class="cc-link">privacy@makingsense.com</a>',
                    }
                ]
            }
        }
    }
});