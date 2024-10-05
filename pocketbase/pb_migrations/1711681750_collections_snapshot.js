/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const snapshot = [
			{
				id: '_pb_users_auth_',
				created: '2024-03-19 04:18:26.360Z',
				updated: '2024-03-27 22:13:02.854Z',
				name: 'users',
				type: 'auth',
				system: false,
				schema: [
					{
						system: false,
						id: 'users_name',
						name: 'name',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'users_avatar',
						name: 'avatar',
						type: 'file',
						required: false,
						presentable: false,
						unique: false,
						options: {
							mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
							thumbs: null,
							maxSelect: 1,
							maxSize: 5242880,
							protected: false
						}
					},
					{
						system: false,
						id: 'mwn7vztx',
						name: 'role',
						type: 'select',
						required: false,
						presentable: false,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['admin', 'user']
						}
					}
				],
				indexes: [],
				listRule: 'id = @request.auth.id',
				viewRule: 'id = @request.auth.id',
				createRule: '',
				updateRule: 'id = @request.auth.id',
				deleteRule: 'id = @request.auth.id',
				options: {
					allowEmailAuth: true,
					allowOAuth2Auth: true,
					allowUsernameAuth: true,
					exceptEmailDomains: null,
					manageRule: null,
					minPasswordLength: 8,
					onlyEmailDomains: null,
					onlyVerified: false,
					requireEmail: false
				}
			},
			{
				id: 't2axrfmcwthb802',
				created: '2024-03-21 00:02:16.313Z',
				updated: '2024-03-29 03:04:32.098Z',
				name: 'trips',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'xymfmozb',
						name: 'name',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'ugaebmat',
						name: 'startDate',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'kwvlaxze',
						name: 'endDate',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: "@request.auth.role = 'admin'",
				options: {}
			},
			{
				id: '5lbvej7sjeja9i3',
				created: '2024-03-22 19:43:23.255Z',
				updated: '2024-03-29 03:08:02.609Z',
				name: 'courses',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'xinjkrru',
						name: 'name',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: '@request.auth.id != ""',
				options: {}
			},
			{
				id: 'wk0de5qc1hytuou',
				created: '2024-03-22 20:27:54.384Z',
				updated: '2024-03-29 03:05:24.971Z',
				name: 'teeBoxes',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'zkwej4na',
						name: 'course',
						type: 'relation',
						required: false,
						presentable: false,
						unique: false,
						options: {
							collectionId: '5lbvej7sjeja9i3',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'lysxupsu',
						name: 'name',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'k68k2kmn',
						name: 'rating',
						type: 'number',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							noDecimal: false
						}
					},
					{
						system: false,
						id: 'jilwrwqg',
						name: 'slope',
						type: 'number',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							noDecimal: false
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: '@request.auth.id != ""',
				options: {}
			},
			{
				id: 'n1vyk3ru1k89qt5',
				created: '2024-03-23 00:09:20.966Z',
				updated: '2024-03-29 03:07:49.493Z',
				name: 'holeInfo',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'awzuba7c',
						name: 'teeBox',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: 'wk0de5qc1hytuou',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'zsmbmuqn',
						name: 'holeNumber',
						type: 'number',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: 1,
							max: 18,
							noDecimal: true
						}
					},
					{
						system: false,
						id: 'r3l07xyu',
						name: 'par',
						type: 'number',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: 3,
							max: 5,
							noDecimal: true
						}
					},
					{
						system: false,
						id: 'n5xhulra',
						name: 'yardage',
						type: 'number',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							noDecimal: true
						}
					},
					{
						system: false,
						id: 'f14d4a2o',
						name: 'handicap',
						type: 'number',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: 1,
							max: 18,
							noDecimal: true
						}
					}
				],
				indexes: [
					'CREATE UNIQUE INDEX `idx_GrpNKKV` ON `holeInfo` (\n  `teeBox`,\n  `holeNumber`\n)'
				],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: '@request.auth.id != ""',
				options: {}
			},
			{
				id: 'n76trctxqi74i5q',
				created: '2024-03-23 00:50:40.038Z',
				updated: '2024-03-29 03:07:04.887Z',
				name: 'players',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'xh1c4nan',
						name: 'handicap',
						type: 'number',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							noDecimal: false
						}
					},
					{
						system: false,
						id: 'wylqtrwi',
						name: 'trips',
						type: 'relation',
						required: false,
						presentable: false,
						unique: false,
						options: {
							collectionId: 't2axrfmcwthb802',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'je1lgqkm',
						name: 'name',
						type: 'text',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: '@request.auth.id != ""',
				options: {}
			},
			{
				id: '8knju9dd0uz9tx7',
				created: '2024-03-23 01:41:39.800Z',
				updated: '2024-03-29 03:06:51.121Z',
				name: 'rounds',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'z6inwo0h',
						name: 'trip',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: 't2axrfmcwthb802',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'jsvadwcg',
						name: 'course',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: '5lbvej7sjeja9i3',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'quwhykg1',
						name: 'name',
						type: 'text',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'cjjtfk2d',
						name: 'date',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: '@request.auth.id != ""',
				options: {}
			},
			{
				id: 'iotd0y0motx4m96',
				created: '2024-03-23 02:42:20.060Z',
				updated: '2024-03-29 03:06:28.743Z',
				name: 'scorecards',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'mvzobrnk',
						name: 'player',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: 'n76trctxqi74i5q',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'ojn5uzzd',
						name: 'round',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: '8knju9dd0uz9tx7',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'lhrpavnv',
						name: 'teeBox',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: 'wk0de5qc1hytuou',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'ccoqo5k1',
						name: 'playerHandicap',
						type: 'number',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							noDecimal: false
						}
					}
				],
				indexes: ['CREATE INDEX `idx_bvTUNQ9` ON `scorecards` (\n  `player`,\n  `round`\n)'],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: '@request.auth.id != ""',
				options: {}
			},
			{
				id: 'hnh6zsmtg1u5stl',
				created: '2024-03-23 03:10:37.269Z',
				updated: '2024-03-29 03:07:26.547Z',
				name: 'holeScores',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'nua0q8yg',
						name: 'scorecard',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: 'iotd0y0motx4m96',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: '8ws0gkdh',
						name: 'holeNumber',
						type: 'number',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: 1,
							max: 18,
							noDecimal: true
						}
					},
					{
						system: false,
						id: 'wzkcra1g',
						name: 'score',
						type: 'number',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							noDecimal: true
						}
					}
				],
				indexes: [
					'CREATE UNIQUE INDEX `idx_Oi62FcA` ON `holeScores` (\n  `scorecard`,\n  `holeNumber`\n)'
				],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.id != ""',
				updateRule: '@request.auth.id != ""',
				deleteRule: '@request.auth.id != ""',
				options: {}
			}
		];

		const collections = snapshot.map((item) => new Collection(item));

		return Dao(db).importCollections(collections, true, null);
	},
	(db) => {
		return null;
	}
);
