import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import {english,french,urdu} from './language'

i18n
    .use(initReactI18next) // passes i18n down to react-i1
    .init({
        resources: {
            en: {
              translation: english
            },
            ur: {
              translation: urdu
            },
            fr:{
              translation:french
            }
          },
          lng: localStorage.getItem('lang'),
          fallbackLng: 'en', // fallback language if translation not found
        interpolation: {
          escapeValue: false // not needed for React
        }
        });

        export default i18n;
