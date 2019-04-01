import * as http from 'http'
import * as https from 'https'

import AppConfig from '../core/AppConfig'
import CoreService from '../core/CoreService'
import AlmeService from "./AlmeService"
import AppEvConfigurationRes from './model/AppEvConfigurationRes';
import AppEvent, { AppEventName, AppPathSuffix } from './model/AppEvent';
import AppEventRes from './model/AppEventRes';

function getCoreStore(): CoreService {
    const core = new CoreService()
    // alt: 'https://aetep-fpml01.ebu.nextnet.com', ''
    core.Config = new AppConfig('http://localhost:3001', '')
    return core
}

interface IFetchOptions {
    agent: https.Agent | http.Agent
}

function getAlmeStore(): AlmeService {
    let options: IFetchOptions = {agent: new https.Agent({rejectUnauthorized: false})}
    if (getCoreStore().Config.baseApiUrl.startsWith('http://')) {
        options = {agent: new http.Agent()}
    }
    return new AlmeService(getCoreStore(), options)
}

it('generateUUID', done => {
    const uuid = AlmeService.generateUUID()
    const example = '786721b0-2ed7-4abf-af43-40ba371aa128'
    if (example.length !== uuid.length) {
        done.fail(`uuid length does not match example ${uuid.length}, ${example.length}`)
    }
    done()
})

it('createSession', done => {
    const web = getAlmeStore()
    const us = web.createSession()
    expect(us).not.toBeNull()
    done()
})

it ('getConfiguration', async done => {
    const web = getAlmeStore()
    try {
        const res = await web.get(AppPathSuffix.Configuration, AppEvConfigurationRes)
        // console.log("getConfiguration response", res)  // tslint:disable-line
        expect(res instanceof AppEvConfigurationRes).toBe(true)
        expect(res.configurationSettings[0].Key).toBe('SystemErrorResponse')
        done()
    } catch (err) {
        done.fail(err)
    }    
})

it('setSession', async done => {
    const web = getAlmeStore()
    web.createSession()
    const appEv = new AppEvent(AppEventName.QuestionBeforeModeSelect)
    try {
        const res = await web.sendAppEvent(appEv, AppPathSuffix.AppEvent, AppEventRes)
        // console.log("setSession response", res)
        expect(res.responseId).toBe('00000000-0000-0000-0000-000000000000')
        expect(res instanceof AppEventRes).toBe(true)
        done()
    } catch (err) {
        done.fail(err)
    }
})