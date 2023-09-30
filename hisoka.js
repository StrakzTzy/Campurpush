require('./config')

const {
	getGroupAdmins,
	jsonformat,
	runtime,
	sleep
} = require('./db/function')

module.exports = hisoka = async (hisoka, m, chatUpdate, store) => { try {
var body = (m.mtype === 'conversation') ? m.message.conversation: (m.mtype == 'imageMessage') ? m.message.imageMessage.caption: (m.mtype == 'videoMessage') ? m.message.videoMessage.caption: (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text: (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId: (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId: (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId: (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text): ''
var budy = (typeof m.text == 'string' ? m.text: '')
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''
const args = body.trim().split(/ +/).slice(1)
const botId = await hisoka.decodeJid(hisoka.user.id)
const botNumber = botId.split('@')[0]
const ownId = ownNumb.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
const ownNumber = ownNumb.replace(/[^0-9]/g, '')
const dtext = args.join(" ")
const quoted = m.quoted ? m.quoted: m
const groupMetadata = m.isGroup ? await hisoka.groupMetadata(m.chat).catch(e => {}): ''
const groupName = m.isGroup ? groupMetadata.subject: ''
const participants = m.isGroup ? await groupMetadata.participants: ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants): ''
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender): false
const isBotGroupAdmins = m.isGroup ? groupAdmins.includes(botId): false
var isAuthor = autOwn.replace(/[^0-9]/g, '').includes(m.sender.split("@")[0])
var isOwner = ownId.includes(m.sender)
var isMe = botId.includes(m.sender)
var isCreator = isOwner || isAuthor || isMe

const reply = (text) => {
	hisoka.sendMessage(m.chat, {text: text.toString()}, {quoted: m})
}

if (command) {
	hisoka.readMessages([m.key])
	console.log()
	console.log(`${m.isGroup ? '\x1b[0;32mGC\x1b[1;32m-CMD' : '\x1b[1;32mPC-CMD'} \x1b[0m[ \x1b[1;37m${command} \x1b[0m] at \x1b[0;32m${calender}\x1b[0m\n› ${m.chat}\n› from; \x1b[0;37m${m.sender.split('@')[0]}\x1b[0m${m.pushName ? ', '+m.pushName : ''}\n› in; \x1b[0;32m${m.isGroup ? groupName : 'Personal Chat'}\x1b[0m`)
}


switch (command) {

case 'menu': case 'help':
reply(`╼╼╼╼╼╼❏ *INFO - BOT* ❏╼╼╼╼╼╼

≁ Nama BOT : *STRAKZ STORE*
≁ Status : Pemilik Bot

╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼

┍◪ 𝐅𝐈𝐓𝐔𝐑 𝐁𝐎𝐓
┃〆.𝐨𝐰𝐧𝐞𝐫
┃〆.𝐬𝐜𝐫𝐢𝐩𝐭
┃〆.𝐫𝐮𝐧𝐭𝐢𝐦𝐞
┖◪
┍◪ 𝐏𝐔𝐒𝐇 𝐊𝐎𝐍𝐓𝐀𝐊
┃〆.𝐩𝐮𝐬𝐡𝐤𝐨𝐧𝐭𝐚𝐤
┃〆.𝐩𝐮𝐬𝐡𝐤𝐨𝐧𝐭𝐚𝐤𝟐
┃〆.𝐥𝐢𝐬𝐭𝐠𝐫𝐮𝐩
┖◪
┍◪ 𝐒𝐀𝐕𝐄 𝐊𝐎𝐍𝐓𝐀𝐊
┃〆.𝐬𝐚𝐯𝐞𝐤𝐨𝐧𝐭𝐚𝐤
┃〆.𝐬𝐞𝐧𝐝𝐤𝐨𝐧𝐭𝐚𝐤
┃〆.𝐠𝐞𝐭𝐤𝐨𝐧𝐭𝐚𝐤
┃〆.𝐠𝐞𝐭𝐜𝐚𝐬𝐞
┖◪
\n╼╼╼ _*YT|STRAKZ STORE*_ ╼╼╼`)
break // (?); daftar menu

case 'runtime': case 'test':
reply('Runtime; '+runtime(process.uptime()))
break // (?); runtime bot

case 'owner': case 'botowner':
let ownContact = {
	displayName: "Contact", contacts: [{displayName: ownName, vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+ownName+";;;\nFN:"+ownName+"\nitem1.TEL;waid="+ownNumber+":"+ownNumber+"\nitem1.X-ABLabel:Ponsel\nEND:VCARD"}]
} // (?); kontak owner
let soContact = await hisoka.sendMessage(m.chat, {contacts: ownContact}, {quoted: m})
setTimeout(() => {hisoka.sendMessage(m.chat, {delete: soContact.key})}, 20000)
break

case 'script': case 'sc': // hargai penerbit!
let soScript = await hisoka.sendMessage(m.chat, {text: '*Script buy*\nhttps://youtu.be/notfree', contextInfo: {forwardingScore: 2, isForwarded: true}}, {quoted: m})
setTimeout(() => {hisoka.sendMessage(m.chat, {delete: soScript.key})}, 10000)
break // (?); bot script

case 'getcontact': case 'getkontak':
if (!m.isGroup) return reply('fitur_Khusus_grup')
if (!(isGroupAdmins || isCreator)) return reply('fitur_Khusus_admin')
huhuhs = await hisoka.sendMessage(m.chat, {
    text: `*YT|STRAKZSTORE*\nGrup; *${groupMetadata.subject}*\nMember; *${participants.length}*`
}, {quoted: m, ephemeralExpiration: 86400})
await sleep(1000) // (?); mengirim kontak seluruh member
hisoka.sendContact(m.chat, participants.map(a => a.id), huhuhs)
break

case 'savekontak': case 'svkontak':
if (!m.isGroup) return reply('fitur_Khusus_grup')
if (!(isGroupAdmins || isCreator)) return reply('fitur_Khusus_admin')
let cmiggc = await hisoka.groupMetadata(m.chat)
let orgiggc = participants.map(a => a.id)
vcard = ''
noPort = 0
for (let a of cmiggc.participants) {
    vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`
} // (?); mengimpor kontak seluruh member - save
let nmfilect = './contacts.vcf'
reply('_*YT|STRAKZSTORE*_\nSabar lagi save '+cmiggc.participants.length+' kontak')
require('fs').writeFileSync(nmfilect, vcard.trim())
await sleep(2000)
hisoka.sendMessage(m.chat, {
    document: require('fs').readFileSync(nmfilect), mimetype: 'text/vcard', fileName: 'Contact.vcf', caption: '_*YT|STRAKZSTORE*_\nBerhasil\nGroup: *'+cmiggc.subject+'*\nKontak: *'+cmiggc.participants.length+'*'
}, {ephemeralExpiration: 86400, quoted: m})
require('fs').unlinkSync(nmfilect)
break

case 'sendkontak': case 'kontak':
if (!m.isGroup) return reply('fitur_Khusus_grup')
if (!m.mentionedJid[0]) return reply('_*YT|STRAKZSTORE*_\nMasukan tekt yang bener cok\n contoh:.kontak @tag|name')
let snTak = dtext.split(' ')[1] ? dtext.split(' ')[1] : 'Contact'
let snContact = {
	displayName: "Contact", contacts: [{displayName: snTak, vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+snTak+";;;\nFN:"+snTak+"\nitem1.TEL;waid="+m.mentionedJid[0].split('@')[0]+":"+m.mentionedJid[0].split('@')[0]+"\nitem1.X-ABLabel:Ponsel\nEND:VCARD"}]
} // (?); send kontak
hisoka.sendMessage(m.chat, {contacts: snContact}, {ephemeralExpiration: 86400})
break

case 'sendkontag': case 'kontag':
if (!m.isGroup) return reply('fitur_Khusus_grup')
if (!(isGroupAdmins || isCreator)) return reply('fitur_Khusus_admin')
if (!m.mentionedJid[0]) return reply('_*YT|STRAKZSTORE*_\nMasukan tekt yang bener cok\n contoh:.kontak @tag|name')
let sngTak = dtext.split(' ')[1] ? dtext.split(' ')[1] : 'Contact'
let sngContact = {
	displayName: "Contact", contacts: [{displayName: sngTak, vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+sngTak+";;;\nFN:"+sngTak+"\nitem1.TEL;waid="+m.mentionedJid[0].split('@')[0]+":"+m.mentionedJid[0].split('@')[0]+"\nitem1.X-ABLabel:Ponsel\nEND:VCARD"}]
} // (?); send kontak - hidetag
hisoka.sendMessage(m.chat, {contacts: sngContact, mentions: participants.map(a => a.id)}, {ephemeralExpiration: 86400})
break

case 'getcase': case 'case': try {
	if (!isCreator) return reply('not_owner')
	if (!dtext) return reply('nama_case?')
	const getCase = (dtext) => {
		return "case " + `'${dtext}'` + require('fs').readFileSync("hisoka.js").toString().split('case \''+ dtext +'\'')[1].split("break")[0]+"break"
	} // (?); ngambil case
	reply(getCase(dtext))
} catch {
	reply('not_found')
}
break

case 'grouplist': case 'listgrup': case 'listgc': case 'idgrup':
if (!isCreator) return reply('not_owner')
let getGroups = await hisoka.groupFetchAllParticipating()
let gclish = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let gclist = gclish.map(v => v.id)
if (gclist.length > 20) return reply(jsonformat(gclist))
let gctext = `_*YT|STRAKZSTORE*_\nDaftar Grup Elu: (total: ${gclist.length})`
for (let a of gclist) {
	let mdata = await hisoka.groupMetadata(a)
	gctext += `\n\nNama Grup: *${mdata.subject}*\nMemeber: ${mdata.participants.length}\niD: ${mdata.id}`
} // (?); daftar chat grup
reply(gctext)
break

case 'msendchat': case 'pushkontak':
if (!isCreator) return reply('not_owner')
if (!m.isGroup) return reply('fitur_Khusus_grup')
if (!dtext) return reply('_*YT|STRAKZSTORE*_\nMasukan tekt yang bener cok\n contoh:.pushkontak teksnya')
	let pkDetect = await hisoka.groupMetadata(m.chat)
	if (pkDetect.participants.length > 200) return reply('_*YT|STRAKZSTORE*_\nmember maksimal; 200')
	reply('_*YT|STRAKZSTORE*_\nGasken pushkontak total member '+pkDetect.participants.length+' member')
	for (let a of pkDetect.participants) {
	hisoka.sendMessage(a.id, {text: dtext})
	await sleep(2000)
} // (?); kirim pesan ke semua peserta grup
reply('(_*YT|STRAKZSTORE*_\nGroup: *'+pkDetect.subject+'*\nMember: '+pkDetect.participants.length+'\ndelay: 2000\nBERHASIL PUSH')
break

case 'msendchat2': case 'pushkontak2':
if (!isCreator) return reply('not_owner')
	let phkid = dtext.split('|')[0]
	let phktxt = dtext.split('|')[1]
if (!phkid) return reply('*YT|STRAKZSTORE*\nMasukan tekt yang bener cok\n contoh: .pushkontak2 idGc|text')
if (!phktxt) return reply('*YT|STRAKZSTORE*\nMasukan tekt yang bener cok\n contoh:.pushkontak2 idGc|text')
	let pk2Detect = await hisoka.groupMetadata(phkid)
	if (pk2Detect.participants.length > 200) return reply('member maksimal: 200')
	reply('*YT|STRAKZSTORE*\nGasken pushkontak total member '+pk2Detect.participants.length+' member')
	for (let a of pk2Detect.participants) {
	hisoka.sendMessage(a.id, {text: phktxt})
	await sleep(2000)
} // (?); kirim pesan ke semua peserta grup (id)
reply('_*YT|STRAKZSTORE*_\nGroup: *'+pk2Detect.subject+'*\nMember: '+pk2Detect.participants.length+'\ndelay: 2000\nBERHASIL PUSH')
break


default:

if (budy.startsWith('>')) {
    if (!isCreator) return
    try {
        let evaled = await eval(budy.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await reply(evaled)
    } catch (err) {
        await reply(String(err))
    }
}

if (budy.startsWith('$')) {
    if (!isOwner) return
    require("child_process").exec(budy.slice(2), (err, stdout) => {
        if (err) return reply(`${err}`)
        if (stdout) return reply(stdout)
    })
}

}
	} catch (err) {
		const errId = isOwner ? m.chat : ownNumb.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		hisoka.sendMessage(errId, {text: require('util').format(err)}, {quoted: m})
		console.log('\x1b[1;31m'+err+'\x1b[0m')
	}
}


let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
	require('fs').unwatchFile(file)
	console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
	delete require.cache[file]
	require(file)
})