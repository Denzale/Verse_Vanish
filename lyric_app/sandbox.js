const lyric = `
[Verse 1]
Ayy, I remember syrup sandwiches and crime allowances
Finesse a nigga with some counterfeits, but now I'm countin’ this
Parmesan where my accountant lives, in fact, I'm downin' this
D’USSÉ with my boo bae, tastes like Kool-Aid for the analysts
Girl, I can buy your ass the world with my paystub
Ooh, that pussy good, won't you sit it on my taste bloods?
I get way too petty once you let me do the extras
Pull up on your block, then break it down: we playin' Tetris
AM to the PM, PM to the AM, funk
Piss out your per diem, you just gotta hate 'em, funk
If I quit your BM, I still ride Mercedes, funk
If I quit this season, I still be the greatest, funk
My left stroke just went viral
Right stroke put lil' baby in a spiral
Soprano C, we like to keep it on a high note
It's levels to it, you and I know

[Chorus]
Bitch, be humble (Hol' up, bitch)
Sit down (Hol' up, lil’, hol’ up, lil' bitch)
Be humble (Hol’ up, bitch)
Sit down (Hol' up, sit down, lil', sit down, lil' bitch)
Be humble (Hol’ up, hol' up)
Bitch, sit down (Hol' up, hol' up, lil' bitch)
Be humble (Lil' bitch, hol' up, bitch)
Sit down (Hol' up, hol' up, hol' up, hol' up)
Be humble (Hol' up, hol' up)
Sit down (Hol' up, hol' up, lil', hol' up, lil' bitch)
Be humble (Hol' up, bitch)
Sit down (Hol' up, sit down, lil', sit down, lil' bitch)
Be humble (Hol' up, hol' up)
Bitch, sit down (Hol' up, hol' up, lil' bitch)
Be humble (Lil' bitch, hol' up, bitch)
Sit down (Hol' up, hol' up, hol' up, hol' up)

[Verse 2]
Who that nigga thinkin' that he frontin' on Man-Man? (Man-Man)
Get the fuck off my stage, I'm the Sandman (Sandman)
Get the fuck off my dick, that ain't right
I make a play fucking up your whole life
I'm so fuckin' sick and tired of the Photoshop
Show me somethin' natural like afro on Richard Pryor
Show me somethin' natural like ass with some stretch marks
Still I take you down right on your mama couch in Polo socks
Ayy, this shit way too crazy, ayy, you do not amaze me, ayy
I blew cool from AC, ayy, Obama just paged me, ayy
I don't fabricate it, ayy, most of y'all be fakin', ayy
I stay modest 'bout it, ayy, she elaborate it, ayy
This that Grey Poupon, that Evian, that TED Talk, ayy
Watch my soul speak, you let the meds talk, ayy
If I kill a nigga, it won't be the alcohol, ayy
I'm the realest nigga after all`;


// Use regular expressions to extract the sections
const chorus = lyric.match(/\[Chorus\]\n([\s\S]+?)\n\n/)[1].trim();
const verse1 = lyric.match(/\[Verse 1\]\n([\s\S]+?)\n\n/)[1].trim();
const verse2 = lyric.match(/\[Verse 2\]\n([\s\S]+?)\n?$/)[1].trim();

const lyricsArray = lyricsString.split(".");

// Remove any leading or trailing spaces from each line
const cleanLyricsArray = lyricsArray.map(line => line.trim());

console.log(cleanLyricsArray);
// Output: ['I came in like a wrecking ball', 'I never hit so hard in love', 'All I wanted was to break your walls']

console.log('Chorus:');
console.log(chorus);
console.log('Verse 1:');
console.log(verse1);
console.log('Verse 2:');
console.log(verse2);