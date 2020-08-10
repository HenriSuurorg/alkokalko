const joobeastmed = [
	{
		promile: 0.2,
		description:
			"Võid tunda ennast kergelt lõdvestununa ning sisemised piirangud on veidi vähenenud. Kergelt on võimendunud meeleolu, mis oli enne joomisega alustamist."
	},
	{
		promile: 0.4,
		description:
			"Tunned soojust ja lõdvestust. Sinu käitumine võib olla liialdatud – räägid julgemalt, kiiremini ja valjema häälega kui muidu. Emotsioonid on võimendunud – hea tuju muutub veel paremaks ja negatiivsed emotsioonid veel negatiivsemaks. Võid tunda kerget eufooriat. Mõtlemisvõime ja mälu võivad olla kergelt häiritud, muutes sind ettevaatamatuks."
	},
	{
		promile: 0.7,
		description:
			"Sellel purjusoleku tasemel hakkavad häiruma tasakaal, motoorsed võimed, kõne selgus, reaktsiooniaeg, nägemine ja kuulmine. Otsustus- ja arutlusvõime ning enesekontroll on häiritud, arvad, et saad paremini hakkama kui tegelikult ning sul on raske otsustada, et sa ei jätka joomist. Võid tunda eufooriat."
	},
	{
		promile: 1,
		description:
			"unned ennast eufoorilisena, kuid sinu motoorsed võimed, koordinatsioon, reaktsiooniaeg ja tasakaal on juba tugevalt häiritud. Samuti arutlusvõime ning mälu. Tõenäoliselt sa ei mäleta, mitu jooki oled juba joonud. Sinu emotsioonid on võimendunud. Osad inimesed muutuvad väga valjuhäälseks ja agressiivseks."
	},
	{
		promile: 1.3,
		description:
			"Puudub tasakaal ning nägemine on hägune, sul on raskusi rääkimise ja kõndimisega. Mõtlemine, taju ja otsustusvõime on tugevalt häiritud. Eufooria hakkab üle minema ning asendub ebameeldivate tunnetega nagu ärevus, rahutus, viha ja masendus."
	},
	{
		promile: 1.6,
		description:
			"Tunned tugevaid negatiivseid emotsioone ja võid tänu sellele muutuda agressiivseks – võid kogemata vigastada ennast või teisi. Selles staadiumis võivad tekkida „mäluaugud“ – aju ei salvesta enam toimunut. Motoorsed võimed on tugevalt kahjustunud."
	},
	{
		promile: 2,
		description:
			"Näed välja segaduses, oimetu ja võimetu asjadest aru saama. Sul on vaja abi, et tõusta püsti või kõndida. Kui sa oled ennast vigastanud, siis sa tõenäoliselt ei adu seda, sest sa ei tunne valu. Võid tunda iiveldust või oksendada (mõnedel inimestel võivad need sümptomid varem tekkida). Kuna okserefleks võib olla häiritud, on oht et sa lämbud oma okse sisse. Mäluaugud on sellises staadiumis sagedased, selle tõttu sa tõenäoliselt ei mäleta kõigest sellest järgmisel hommikul midagi."
	},
	{
		promile: 2.5,
		description:
			"Kõik psüühilised, füüsilised ja tajufunktsioonid on tugevalt häiritud. Emotsionaalselt oled tundetu. Suurenenud on risk oma okse sisse lämbuda või ennast tugevalt vigastada kukkudes või muudesse õnnetustesse sattudes."
	},
	{
		promile: 3,
		description:
			"Oled poolteadvusetus olekus. Sul puudub arusaamine sellest, kus sa oled. Võid äkitselt teadvuse kaotada ja sind on raske äratada."
	},
	{
		promile: 3.5,
		description:
			"Selle alkoholitaseme mõju on sama, mis anesteesial, mida kasutatakse operatsioonide puhul. Võimalik, et langed koomasse. Hingamine võib katkeda."
	},
	{
		promile: 4,
		description: "Südame töö ja hingamine on häiritud. Oled tõenäoliselt koomas või juba surnud."
	}
];

export const joobeAste = (currentBac: number) => {
	if (currentBac < 0.04 && currentBac > 0) return joobeastmed[0].description;
	else if (currentBac < 0.06) return joobeastmed[1].description;
	else if (currentBac < 0.09) return joobeastmed[2].description;
	else if (currentBac < 0.12) return joobeastmed[3].description;
	else if (currentBac < 0.15) return joobeastmed[4].description;
	else if (currentBac < 0.19) return joobeastmed[5].description;
	else if (currentBac < 0.25) return joobeastmed[6].description;
	else if (currentBac < 0.3) return joobeastmed[7].description;
	else if (currentBac < 0.35) return joobeastmed[8].description;
	else if (currentBac < 0.4) return joobeastmed[9].description;
	else if (currentBac >= 0.4) return joobeastmed[10].description;

	return null;
};
