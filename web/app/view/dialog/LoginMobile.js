/*
 * Copyright 2015 - 2017 Anton Tananaev (anton@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.dialog.LoginMobile', {
    extend: 'Traccar.view.dialog.Base',
    alias: 'widget.loginMobile',

    requires: [
        'Traccar.view.dialog.LoginController'
    ],
    controller: 'login',

    initComponent: function () {
        this.callParent();
        // Mobile friendly (not this.y = 0 because it's ugly in the login screen)
        this.y = Ext.getBody().getViewSize().height / 10;
    },

    header: false,
    closable: false,

    items: {
        xtype: 'form',
        reference: 'form',

        autoEl: {
            tag: 'form',
            method: 'POST',
            action: 'fake-login.html',
            target: 'submitTarget'
        },

        items: [{
            xtype: 'image',
            src: 'logo.svg',
            alt: Strings.loginLogo,
            width: window.innerWidth - 25,
            height: 34,
            style: {
                display: 'block',
                margin: '10px auto 25px'
            }
        }, {
            xtype: 'pickerfield',
            fieldLabel: Strings.settingsServer,
            editable: false,
            value: window.location.host,
            // hidden: !window.appInterface && !(window.webkit && window.webkit.messageHandlers.appInterface),
            hidden: true,
            createPicker: function () {
                var self = this, popup = Ext.create({
                    xtype: 'window',
                    closeAction: 'hide',
                    referenceHolder: true,
                    minWidth: 210,
                    layout: 'form',
                    header: false,
                    resizable: true,
                    items: [{
                        xtype: 'textfield',
                        anchor: '100%',
                        reference: 'serverAddress',
                        value: window.location.href
                    }],
                    fbar: [{
                        text: Strings.sharedSet,
                        handler: function () {
                            var message = 'server|' + popup.lookupReference('serverAddress').getValue();
                            if (window.webkit && window.webkit.messageHandlers.appInterface) {
                                window.webkit.messageHandlers.appInterface.postMessage(message);
                            }
                            if (window.appInterface) {
                                window.appInterface.postMessage(message);
                            }
                        }
                    }, {
                        text: Strings.sharedCancel,
                        handler: function () {
                            self.collapse();
                        }
                    }]
                });
                return popup;
            }
        }, {
            xtype: 'combobox',
            name: 'language',
            flex: 1,
            width: window.innerWidth - 25,
            fieldLabel: Strings.loginLanguage,
            store: 'Languages',
            displayField: 'name',
            valueField: 'code',
            editable: false,
            submitValue: false,
            hidden: true,
            listeners: {
                select: 'onSelectLanguage'
            },
            reference: 'languageField'
        }, {
            xtype: 'textfield',
            name: 'email',
            flex: 1,
            width: window.innerWidth - 25,
            reference: 'userField',
            fieldLabel: Strings.username,
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                specialKey: 'onSpecialKey',
                afterrender: 'onAfterRender'
            },
            inputAttrTpl: ['autocomplete="on" autocapitalize="none"']
        }, {
            xtype: 'textfield',
            name: 'password',
            flex: 1,
            width: window.innerWidth - 25,
            reference: 'passwordField',
            fieldLabel: Strings.userPassword,
            inputType: 'password',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                specialKey: 'onSpecialKey'
            },
            inputAttrTpl: ['autocomplete="on"']
        }, {
            xtype: 'checkboxfield',
            inputValue: true,
            uncheckedValue: false,
            reference: 'rememberField',
            fieldLabel: Strings.userRemember
        }, {
            xtype: 'component',
            html: '<iframe id="submitTarget" name="submitTarget" style="display:none"></iframe>'
        }, {
            xtype: 'component',
            html: '<input type="submit" id="submitButton" style="display:none">'
        }]
    },

    buttons: [{
        text: Strings.loginReset,
        handler: 'onResetClick',
        reference: 'resetButton'
    }, {
        text: Strings.loginRegister,
        handler: 'onRegisterClick',
        reference: 'registerButton'
    }, {
        text: Strings.loginLogin,
        handler: 'onLoginClick'
    }]
});
