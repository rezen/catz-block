const possibleCatNames = [
    'Nala',
    'Luna',
    'Abby',
    'Bella',
    'Daisy',
    'Cleo',
    'Willow',
    'Angel',
    'Coco',
    'Hazel',
    'Alice',
    'Bambi',
    'Oreo',
    'Belle',
    'Kiki',
    'Buttercup',
    'Cookie',
    'Addison',
    'Ava',
    'Addie',
    'Jinx',
    'Biscuit',
    'Autumn',
    'Amber',
    'Rose',
    'Simba',
    'Milo',
    'Alfie',
    'Oreo',
    'Binx',
    'Jasper',
    'Felix',
    'Biscuit',
    'Bear',
    'Tiger',
    'Blue',
    'Archie',
    'Finn',
    'Arlo',
    'Gizmo',
    'Charlie',
    'Caesar',
    'Coco',
    'Casper',
    'Bacon',
    'Whiskers',
    'Meeko',
    'Bailey',
    'Tigger',
    'Waffles',
];


export function randomCats(number=6) {
	return possibleCatNames.sort(() => 0.5 - Math.random()).slice(0, number).map((name, idx) => {
		return {
			id: idx,
			name,
		};
	});
}

export function randomCat(id) {
	const cat = randomCats(1)[0];
	cat.id = id;
	return cat;
}
