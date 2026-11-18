/**
 * LOUVRE REVOLUTION ANTIGRAVITE - COMPLETE VERBATIM PRESENTATION DATA
 * Extracted 100% strictly from "New Note 2026-11-06 00-00-35.pdf"
 * Dual Language: English (EN) and French (FR)
 */

const PRESENTATION_DATA = {
  meta: {
    title: {
      en: "Louvre Museum: French Literature, History & Revolutionary Thought",
      fr: "Musée du Louvre : Littérature Française, Histoire et Pensée Révolutionnaire"
    },
    subtitle: {
      en: "A 3D Antigravity Exhibition inside the Grand Galleries of the Louvre",
      fr: "Une exposition 3D en apesanteur dans les Grandes Galeries du Louvre"
    }
  },

  wings: [
    {
      id: "wing-timeline",
      num: "I",
      title: {
        en: "Chronological Timeline & History of France",
        fr: "Frise Chronologique & Histoire de France"
      },
      tagline: {
        en: "From the 15th to the 20th Century: A Tapestry of Literary Evolution",
        fr: "Du XVe au XXe Siècle : Une Fresque de l'Évolution Littéraire"
      },
      description: {
        en: "Explore the comprehensive chronological panorama of French literature from the Renaissance to the Modern Era, juxtaposed against the macro-history of France.",
        fr: "Explorez le panorama chronologique complet de la littérature française depuis la Renaissance jusqu'à l'ère moderne, mis en regard avec la grande histoire de France."
      },
      canvases: [
        {
          id: "hist-france",
          type: "full-poster",
          image: "assets/images/histoire_de_france.jpg",
          fallbackThumb: "assets/images/img_17.jpg",
          title: {
            en: "History of France (Histoire de France)",
            fr: "Histoire de France (Éditions Lito - Adèle Combes)"
          },
          caption: {
            en: "An exhaustive illustrated fresco spanning Prehistory, Antiquity, the Middle Ages, the Modern Era, and the Contemporary Age.",
            fr: "Une fresque illustrée exhaustive couvrant la Préhistoire, l'Antiquité, le Moyen Âge, les Temps Modernes et l'Époque Contemporaine."
          },
          details: {
            en: [
              "La Préhistoire: From early stone tools (-800,000) to Cro-Magnon (-40,000) and the Lascaux cave paintings (-17,000).",
              "L'Antiquité: The Gallic tribes, Caesar's victory over Vercingetorix at Alesia (-52), and the Gallo-Roman civilization.",
              "Le Moyen Âge: Clovis (481), Charlemagne (768), Hugues Capet (987), the building of Notre-Dame de Paris (1163), and Joan of Arc (1429).",
              "Les Temps Modernes: The Renaissance (François Ier, 1515), Wars of Religion (St. Bartholomew's Day, 1572), Henri IV (Edict of Nantes, 1598), and Louis XIV (Versailles, 1661).",
              "L'Époque Contemporaine: The French Revolution (1789, Storming of the Bastille, Declaration of the Rights of Man), Napoleon Bonaparte, 1830 and 1848 Revolutions, Third Republic, World Wars, and the Fifth Republic."
            ],
            fr: [
              "La Préhistoire : Des premiers outils de pierre taillée (-800 000) à Cro-Magnon (-40 000) et la grotte de Lascaux (-17 000).",
              "L'Antiquité : Les tribus gauloises, la victoire de César sur Vercingétorix à Alésia (-52) et la civilisation gallo-romaine.",
              "Le Moyen Âge : Clovis (481), Charlemagne (768), Hugues Capet (987), la construction de Notre-Dame de Paris (1163) et Jeanne d'Arc (1429).",
              "Les Temps Modernes : La Renaissance (François Ier, 1515), les Guerres de Religion (Saint-Barthélemy, 1572), Henri IV (Édit de Nantes, 1598) et Louis XIV (Versailles, 1661).",
              "L'Époque Contemporaine : La Révolution Française (1789, Prise de la Bastille, Déclaration des droits de l'homme), Napoléon Bonaparte, les Révolutions de 1830 et 1848, la IIIe République, les Guerres Mondiales et la Ve République."
            ]
          }
        },
        {
          id: "frise-lit",
          type: "full-poster",
          image: "assets/images/frise_chronologique.png",
          fallbackThumb: "assets/images/img_20.jpg",
          title: {
            en: "Chronological Timeline of French Literature (15th–20th Century)",
            fr: "Frise chronologique de la littérature française du XVème au XXème siècle"
          },
          caption: {
            en: "The definitive chronological progression of major French literary currents and their emblematic masters.",
            fr: "La progression chronologique définitive des grands courants littéraires français et de leurs maîtres emblématiques."
          },
          movements: [
            {
              name: { en: "Humanism (1490–1580)", fr: "Humanisme (1490–1580)" },
              authors: "François Rabelais (1483–1553), Michel de Montaigne (1533–1592)"
            },
            {
              name: { en: "Pléiade (1550–1560)", fr: "Pléiade (1550–1560)" },
              authors: "Joachim Du Bellay (1522–1566), Pierre de Ronsard (1524–1585)"
            },
            {
              name: { en: "Baroque & Classicism (1580–1690)", fr: "Baroque & Classicisme (1580–1690)" },
              authors: "Pierre Corneille (1606–1684), Jean Racine (1639–1699), Molière (1622–1673), Jean de La Fontaine (1621–1695)"
            },
            {
              name: { en: "Enlightenment / Lumières (1690–1789)", fr: "Les Lumières (1690–1789)" },
              authors: "Voltaire (1694–1778), Jean-Jacques Rousseau (1712–1778), Denis Diderot (1713–1784), Montesquieu (1689–1755), Marivaux (1688–1763), Beaumarchais (1732–1799)"
            },
            {
              name: { en: "Romanticism (1789–1860)", fr: "Romantisme (1789–1860)" },
              authors: "Victor Hugo (1802–1885)"
            },
            {
              name: { en: "Realism & Naturalism (1830–1890)", fr: "Réalisme & Naturalisme (1830–1890)" },
              authors: "Honoré de Balzac (1799–1850), Gustave Flaubert (1821–1880), Stendhal (1783–1842), George Sand (1804–1876), Émile Zola (1840–1902)"
            },
            {
              name: { en: "Symbolism (1850–1900)", fr: "Symbolisme (1850–1900)" },
              authors: "Charles Baudelaire (1821–1867), Paul Verlaine (1844–1896)"
            },
            {
              name: { en: "Surrealism (1924–1966)", fr: "Surréalisme (1924–1966)" },
              authors: "Louis Aragon (1897–1982), Paul Éluard (1895–1952)"
            },
            {
              name: { en: "Theatre of the Absurd (1950–1960)", fr: "Théâtre de l'Absurde (1950–1960)" },
              authors: "Samuel Beckett (1906–1989), Eugène Ionesco (1909–1994), Albert Camus (1913–1960)"
            }
          ]
        }
      ]
    },

    {
      id: "wing-periods",
      num: "II",
      title: {
        en: "Three Periods of French Literature (1600–2000)",
        fr: "Trois Périodes de la Littérature Française (1600–2000)"
      },
      tagline: {
        en: "Three Epochs Defining Thought, Revolution, and Global Modernity",
        fr: "Trois Époques Façonnant la Pensée, la Révolution et la Modernité"
      },
      periods: [
        {
          id: "period-1",
          image: "assets/images/img_23.jpg",
          subImage: "assets/images/img_32.jpg",
          periodNum: "Period 1 · 1600–1789",
          title: {
            en: "The Age of Classicism and Enlightenment",
            fr: "L'Âge du Classicisme et des Lumières"
          },
          focus: {
            en: "Reason, philosophy, science, human rights and social criticism.",
            fr: "Raison, philosophie, science, droits de l'homme et critique sociale."
          },
          authorHeader: {
            en: "Your author: Voltaire (1694–1778)",
            fr: "Votre auteur : Voltaire (1694–1778)"
          },
          authors: [
            {
              num: 1,
              name: "Molière (1622–1673)",
              desc: {
                en: "Playwright famous for social satire and comedy.",
                fr: "Dramaturge célèbre pour la satire sociale et la comédie."
              }
            },
            {
              num: 2,
              name: "Jean Racine (1639–1699)",
              desc: {
                en: "Classical tragedy writer.",
                fr: "Auteur de tragédies classiques."
              }
            },
            {
              num: 3,
              name: "Pierre Corneille (1606–1684)",
              desc: {
                en: "Known for classical French drama.",
                fr: "Connu pour le théâtre dramatique classique français."
              }
            },
            {
              num: 4,
              name: "Jean de La Fontaine (1621–1695)",
              desc: {
                en: "Famous for his literary fables.",
                fr: "Célèbre pour ses fables littéraires."
              }
            },
            {
              num: 5,
              name: "Montesquieu (1689–1755)",
              desc: {
                en: "Political philosopher and author of The Spirit of the Laws.",
                fr: "Philosophe politique et auteur de De l'esprit des lois."
              }
            }
          ]
        },
        {
          id: "period-2",
          image: "assets/images/img_26.jpg",
          subImage: "assets/images/img_35.jpg",
          periodNum: "Period 2 · 1789–1900",
          title: {
            en: "The Age of Revolution and Literary Realism",
            fr: "L'Âge des Révolutions et du Réalisme"
          },
          focus: {
            en: "Revolution, freedom, romanticism, realism, society and political thought.",
            fr: "Révolution, liberté, romantisme, réalisme, société et pensée politique."
          },
          authorHeader: {
            en: "Your authors:\n• Alexis de Tocqueville (1805–1859)\n• Victor Hugo (1802–1885)\n• Gustave Flaubert (1821–1880)",
            fr: "Vos auteurs :\n• Alexis de Tocqueville (1805–1859)\n• Victor Hugo (1802–1885)\n• Gustave Flaubert (1821–1880)"
          },
          authors: [
            {
              num: 1,
              name: "Stendhal (1783–1842)",
              desc: {
                en: "Novelist, famous for The Red and the Black.",
                fr: "Romancier, célèbre pour Le Rouge et le Noir."
              }
            },
            {
              num: 2,
              name: "Honoré de Balzac (1799–1850)",
              desc: {
                en: "Realist novelist; author of La Comédie humaine.",
                fr: "Romancier réaliste ; auteur de La Comédie humaine."
              }
            },
            {
              num: 3,
              name: "George Sand (1804–1876)",
              desc: {
                en: "Novelist who explored society, love and women's independence.",
                fr: "Romancière qui a exploré la société, l'amour et l'émancipation des femmes."
              }
            },
            {
              num: 4,
              name: "Charles Baudelaire (1821–1867)",
              desc: {
                en: "Poet; famous for The Flowers of Evil.",
                fr: "Poète ; célèbre pour Les Fleurs du mal."
              }
            },
            {
              num: 5,
              name: "Émile Zola (1840–1902)",
              desc: {
                en: "Novelist; leading figure of literary naturalism.",
                fr: "Romancier ; figure de proue du naturalisme littéraire."
              }
            }
          ]
        },
        {
          id: "period-3",
          image: "assets/images/img_29.jpg",
          subImage: "assets/images/img_38.jpg",
          periodNum: "Period 3 · 1900–2000",
          title: {
            en: "The Age of Modern Thought and Cultural Exchange",
            fr: "L'Âge de la Pensée Moderne et des Échanges Culturels"
          },
          focus: {
            en: "Modern philosophy, cultural studies, Eastern and Western traditions, music and identity.",
            fr: "Philosophie moderne, études culturelles, traditions orientales et occidentales, musique et identité."
          },
          authorHeader: {
            en: "Your author: Alain Daniélou (1907–1994)",
            fr: "Votre auteur : Alain Daniélou (1907–1994)"
          },
          authors: [
            {
              num: 1,
              name: "Marcel Proust (1871–1922)",
              desc: {
                en: "Modernist novelist, famous for In Search of Lost Time.",
                fr: "Romancier moderniste, célèbre pour À la recherche du temps perdu."
              }
            },
            {
              num: 2,
              name: "Albert Camus (1913–1960)",
              desc: {
                en: "Writer and philosopher; famous for The Stranger.",
                fr: "Écrivain et philosophe ; célèbre pour L'Étranger."
              }
            },
            {
              num: 3,
              name: "Jean-Paul Sartre (1905–1980)",
              desc: {
                en: "Philosopher, novelist and leading existentialist.",
                fr: "Philosophe, romancier et chef de file de l'existentialisme."
              }
            },
            {
              num: 4,
              name: "Simone de Beauvoir (1908–1986)",
              desc: {
                en: "Writer and philosopher; famous for The Second Sex.",
                fr: "Écrivaine et philosophe ; célèbre pour Le Deuxième Sexe."
              }
            },
            {
              num: 5,
              name: "Marguerite Duras (1914–1996)",
              desc: {
                en: "Novelist, playwright and filmmaker; famous for The Lover.",
                fr: "Romancière, dramaturge et cinéaste ; célèbre pour L'Amant."
              }
            }
          ]
        }
      ]
    },

    {
      id: "wing-profiles",
      num: "III",
      title: {
        en: "Core Author Profiles: The Intellectual Colossi",
        fr: "Profils Majeurs : Les Colosses Intellectuels"
      },
      tagline: {
        en: "Defining Phrases and Rationales for Three Visionary Minds",
        fr: "Phrases Fondatrices et Justifications pour Trois Esprits Visionnaires"
      },
      profiles: [
        {
          id: "profile-hugo",
          author: "Victor Hugo",
          image: "assets/images/img_49.jpg",
          portrait: "assets/images/img_71.jpg",
          number: "2. Victor Hugo",
          phrase: {
            en: 'Phrase: "A literary colossus" (or "A force of nature")',
            fr: 'Formule : « Un colosse littéraire » (ou « Une force de la nature »)'
          },
          whyHeader: {
            en: "Why it fits Victor Hugo:",
            fr: "Pourquoi cette formule s'applique à Victor Hugo :"
          },
          rationale: {
            en: 'Victor Hugo was a powerhouse of 19th-century French literature, poetry, and political activism. As the leading figure of French Romanticism, he authored epic masterpieces like Les Misérables and The Hunchback of Notre-Dame, while also serving as a passionate advocate for human rights, democracy, and social justice. Calling him a "literary colossus" reflects his immense influence, massive body of work, and towering presence in French cultural history.',
            fr: 'Victor Hugo était une force majeure de la littérature française, de la poésie et de l\'activisme politique du XIXe siècle. Figure de proue du romantisme français, il a écrit des chefs-d\'œuvre épiques comme Les Misérables et Notre-Dame de Paris, tout en étant un ardent défenseur des droits de l\'homme, de la démocratie et de la justice sociale. Le qualifier de « colosse littéraire » reflète son immense influence, son œuvre monumentale et sa stature imposante dans l\'histoire culturelle française.'
          }
        },
        {
          id: "profile-danielou",
          author: "Alain Daniélou",
          image: "assets/images/img_52.jpg",
          portrait: "assets/images/img_58.jpg",
          number: "3. Alain Daniélou",
          phrase: {
            en: 'Phrase: "A bridge between East and West" (or "A true Renaissance man")',
            fr: 'Formule : « Un pont entre l\'Orient et l\'Occident » (ou « Un véritable homme de la Renaissance »)'
          },
          whyHeader: {
            en: "Why it fits Alain Daniélou:",
            fr: "Pourquoi cette formule s'applique à Alain Daniélou :"
          },
          rationale: {
            en: "Alain Daniélou was a French Indologist, musicologist, historian, translator, and artist who spent decades living in India studying Hindu philosophy, classical Indian music, and ancient texts. He immersed himself deeply into a culture foreign to his birth, translating fundamental texts and introducing traditional Indian classical music and spiritual philosophy to the Western world. His intellectual life was defined by cross-cultural immersion and deep polymathic curiosity.",
            fr: "Alain Daniélou était un indianiste, musicologue, historien, traducteur et artiste français qui a passé des décennies à vivre en Inde pour étudier la philosophie hindoue, la musique classique indienne et les textes anciens. Il s'est immergé profondément dans une culture étrangère à sa naissance, traduisant des textes fondamentaux et initiant le monde occidental à la musique classique traditionnelle indienne et à la philosophie spirituelle. Sa vie intellectuelle a été définie par une immersion interculturelle et une profonde curiosité polymathe."
          }
        },
        {
          id: "profile-tocqueville",
          author: "Alexis de Tocqueville",
          image: "assets/images/img_55.jpg",
          portrait: "assets/images/img_64.jpg",
          number: "1. Alexis de Tocqueville",
          phrase: {
            en: 'Phrase: "A visionary before his time" (or "A prophet of modern society")',
            fr: 'Formule : « Un visionnaire avant l\'heure » (ou « Un prophète de la société moderne »)'
          },
          whyHeader: {
            en: "Why it fits Alexis de Tocqueville:",
            fr: "Pourquoi cette formule s'applique à Alexis de Tocqueville :"
          },
          rationale: {
            en: "Alexis de Tocqueville was far more than a generalist or political observer; he was a brilliant analytical thinker. In his landmark work Democracy in America, he foresaw major modern sociopolitical developments—including the rise of individualism, the potential tyranny of the majority, and the inevitable superpower rivalry between America and Russia—long before they materialized. He possessed a rare clarity for identifying how democratic values shape society, politics, and culture.",
            fr: "Alexis de Tocqueville était bien plus qu'un observateur politique généraliste ; c'était un penseur analytique brillant. Dans son ouvrage phare De la démocratie en Amérique, il a anticipé des évolutions sociopolitiques modernes majeures — notamment la montée de l'individualisme, la tyrannie potentielle de la majorité, et l'inévitable rivalité de superpuissances entre l'Amérique et la Russie — bien avant qu'elles ne se matérialisent. Il possédait une clarté rare pour identifier comment les valeurs démocratiques façonnent la société, la politique et la culture."
          }
        }
      ]
    },

    {
      id: "wing-behind",
      num: "IV",
      title: {
        en: "Behind the Authors: Family, Childhood and Personal Life",
        fr: "Dans l'Intimité des Auteurs : Famille, Enfance et Vie Privée"
      },
      tagline: {
        en: "Family Trees, Parental Legacies, and Personal Origins of Five Great French Minds",
        fr: "Arbres Généalogiques, Héritages Parentaux et Origines Privées de Cinq Grands Écrivains"
      },
      bannerSuggestion: {
        image: "assets/images/img_89.jpg",
        text: {
          en: 'My suggestion: In your website, create a separate section called "Behind the Authors: Family, Childhood and Personal Life." Give each author a family tree, a photograph of their parents or spouse where available, and three interesting family facts.',
          fr: 'Ma suggestion : Sur votre site web, créez une section dédiée intitulée « Dans l\'Intimité des Auteurs : Famille, Enfance et Vie Privée ». Donnez à chaque auteur un arbre généalogique, une photographie de leurs parents ou conjoint lorsque disponible, et trois faits familiaux marquants.'
        }
      },
      authors: [
        {
          id: "behind-danielou",
          number: "1. Alain Daniélou (1907–1994)",
          portrait: "assets/images/img_58.jpg",
          cardImage: "assets/images/img_61.jpg",
          fullName: "Alain Daniélou",
          born: "4 October 1907",
          birthplace: "Neuilly-sur-Seine, France",
          knownFor: {
            en: "French historian, musicologist, writer and scholar of Indian culture.",
            fr: "Historien, musicologue, écrivain français et spécialiste de la culture indienne."
          },
          familyBackgroundIntro: {
            en: "Alain Daniélou belonged to a well-established French family with strong connections to politics, religion and education.",
            fr: "Alain Daniélou appartenait à une famille française établie jouissant de solides liens avec la politique, la religion et l'éducation."
          },
          familyPoints: [
            {
              role: { en: "Father – Charles Daniélou:", fr: "Père – Charles Daniélou :" },
              desc: {
                en: "A Breton politician who served as a minister in the French government. He was anticlerical, meaning he opposed the influence of religious institutions in political affairs.",
                fr: "Homme politique breton ayant servi comme ministre au sein du gouvernement français. Il était anticlérical, s'opposant à l'influence des institutions religieuses dans les affaires publiques."
              }
            },
            {
              role: { en: "Mother – Madeleine Clamorgan:", fr: "Mère – Madeleine Clamorgan :" },
              desc: {
                en: "A deeply religious Catholic woman from an old Norman family. She founded educational institutions, including the Sainte-Marie establishments, and established a religious order.",
                fr: "Femme catholique profondément pieuse issue d'une ancienne famille normande. Elle a fondé des institutions éducatives, notamment les établissements Sainte-Marie, et créé un ordre religieux."
              }
            },
            {
              role: { en: "Brother – Jean Daniélou:", fr: "Frère – Jean Daniélou :" },
              desc: {
                en: "His elder brother became a Jesuit priest and later a cardinal in the Catholic Church.",
                fr: "Son frère aîné devint prêtre jésuite puis cardinal au sein de l'Église catholique."
              }
            },
            {
              role: { en: "Siblings:", fr: "Fratrie :" },
              desc: {
                en: "Alain was one of six children.",
                fr: "Alain était l'un des six enfants de la famille."
              }
            }
          ],
          interestingFamilyFacts: [
            {
              en: "Ideological contrast: Raised in a household dramatically torn between his father's militant political secularism and his mother's devout Catholicism.",
              fr: "Contraste idéologique : Élevé au confluent du laïcisme militant de son père ministre et du catholicisme fervent de sa mère fondatrice."
            },
            {
              en: "Cardinal vs. Ascetic: While his brother Jean ascended to the highest ranks of the Vatican, Alain renounced Europe, took initiation into Shaivism in Varanasi, and adopted the Hindu name Shiva Sharan.",
              fr: "Cardinal et Ascète : Alors que son frère Jean accédait au cardinalat au Vatican, Alain renonçait à l'Occident pour s'initier au shivaïsme à Bénarès sous le nom de Shiva Sharan."
            },
            {
              en: "Elite artistic upbringing: Born in Neuilly-sur-Seine into the French cultural elite, he initially trained as a classical pianist and dancer before turning to Indian musical philosophy.",
              fr: "Formation d'élite : Né à Neuilly-sur-Seine dans l'élite bourgeoise, il étudia d'abord le piano classique et la danse avant de se vouer à la musicologie indienne."
            }
          ]
        },

        {
          id: "behind-tocqueville",
          number: "2. Alexis de Tocqueville (1805–1859)",
          portrait: "assets/images/img_64.jpg",
          cardImage: "assets/images/img_67.jpg",
          fullName: "Alexis-Charles-Henri Clérel de Tocqueville",
          born: "29 July 1805",
          birthplace: "Paris, France",
          knownFor: {
            en: "Political thinker, historian and author of Democracy in America.",
            fr: "Penseur politique, historien et auteur de De la démocratie en Amérique."
          },
          familyBackgroundIntro: {
            en: "Tocqueville was born into an aristocratic French family, meaning his family belonged to the traditional upper social class.",
            fr: "Tocqueville est né au sein d'une famille aristocratique française, issue de la haute noblesse traditionnelle."
          },
          familyPoints: [
            {
              role: { en: "Father – Hervé de Tocqueville:", fr: "Père – Hervé de Tocqueville :" },
              desc: {
                en: "A French nobleman and government official who served as a prefect in several regions of France.",
                fr: "Noble français et haut fonctionnaire qui occupa les fonctions de préfet dans plusieurs départements français."
              }
            },
            {
              role: { en: "Mother – Louise-Madeleine Le Peletier de Rosanbo:", fr: "Mère – Louise-Madeleine Le Peletier de Rosanbo :" },
              desc: {
                en: "Came from an influential aristocratic family. She was connected to the Malesherbes family, whose members suffered during the French Revolution.",
                fr: "Issue d'une puissante famille aristocratique. Elle était liée à la famille de Malesherbes, dont les membres subirent de plein fouet les rigueurs de la Révolution française."
              }
            },
            {
              role: { en: "Brothers – Hippolyte and Édouard:", fr: "Frères – Hippolyte et Édouard :" },
              desc: {
                en: "Alexis was the youngest of three sons. Both his elder brothers pursued military and public careers.",
                fr: "Alexis était le benjamin de trois fils. Ses deux frères aînés embrassèrent des carrières militaires et publiques."
              }
            },
            {
              role: { en: "Wife – Mary Mottley:", fr: "Épouse – Mary Mottley :" },
              desc: {
                en: "An Englishwoman whom he married in 1835. His family initially disapproved of the marriage because of her different social background.",
                fr: "Une citoyenne anglaise épousée en 1835. Sa famille désapprouva initialement cette union en raison de leur différence de milieu social."
              }
            },
            {
              role: { en: "Children:", fr: "Enfants :" },
              desc: {
                en: "Alexis and Mary had no children.",
                fr: "Alexis et Mary n'eurent pas d'enfants."
              }
            }
          ],
          interestingFamilyFacts: [
            {
              en: "Shadow of the Guillotine: His great-grandfather, Guillaume-Chrétien de Lamoignon de Malesherbes, bravely defended King Louis XVI at his trial and was guillotined during the Terror.",
              fr: "L'ombre de la Guillotine : Son arrière-grand-père Malesherbes, défenseur de Louis XVI lors de son procès, fut guillotiné avec plusieurs proches sous la Terreur."
            },
            {
              en: "Miraculous escape: His parents were imprisoned in the Conciergerie awaiting execution and were only saved by the fall of Maximilien Robespierre on 9 Thermidor.",
              fr: "Échappés de justesse : Ses parents, emprisonnés à la Conciergerie dans l'attente de leur exécution, ne durent leur salut qu'à la chute de Robespierre le 9 thermidor."
            },
            {
              en: "Defiance of convention: In marrying Mary Mottley, an older middle-class English Protestant, Alexis broke decisively with his class's aristocratic marriage expectations.",
              fr: "Rupture avec les conventions : En épousant Mary Mottley, protestante anglaise sans fortune de neuf ans son aînée, il brava l'opposition formelle de son milieu aristocratique."
            }
          ]
        },

        {
          id: "behind-hugo",
          number: "3. Victor Hugo (1802–1885)",
          portrait: "assets/images/img_71.jpg",
          cardImage: "assets/images/img_74.jpg",
          fullName: "Victor-Marie Hugo",
          born: "26 February 1802",
          birthplace: "Besançon, France",
          knownFor: {
            en: "Novelist, poet and playwright; author of Les Misérables and The Hunchback of Notre-Dame.",
            fr: "Romancier, poète et dramaturge ; auteur des Misérables et de Notre-Dame de Paris."
          },
          familyBackgroundIntro: {
            en: "Victor Hugo was born into a family connected to the French military and political environment.",
            fr: "Victor Hugo est né au sein d'une famille étroitement liée au milieu militaire et politique français."
          },
          familyPoints: [
            {
              role: { en: "Father – Joseph Léopold Sigisbert Hugo:", fr: "Père – Joseph Léopold Sigisbert Hugo :" },
              desc: {
                en: "A French military officer who rose to the rank of general under Napoleon.",
                fr: "Officier militaire français parvenu au grade de général sous l'Empire napoléonien."
              }
            },
            {
              role: { en: "Mother – Sophie Trébuchet:", fr: "Mère – Sophie Trébuchet :" },
              desc: {
                en: "Came from Nantes and had royalist political sympathies. She played an important role in Victor's early upbringing.",
                fr: "Originaire de Nantes, animée de vives sympathies royalistes. Elle joua un rôle primordial dans l'éducation de jeunesse de Victor."
              }
            },
            {
              role: { en: "Brothers – Abel and Eugène Hugo:", fr: "Frères – Abel et Eugène Hugo :" },
              desc: {
                en: "Victor had two elder brothers. Abel was also involved in literary activities.",
                fr: "Victor avait deux frères aînés. Abel participait également à la vie littéraire."
              }
            },
            {
              role: { en: "Wife – Adèle Foucher:", fr: "Épouse – Adèle Foucher :" },
              desc: {
                en: "Victor married his childhood friend Adèle in 1822.",
                fr: "Victor épousa son amie d'enfance Adèle en 1822."
              }
            },
            {
              role: { en: "Children:", fr: "Enfants :" },
              desc: {
                en: "They had five children: Léopold, Léopoldine, Charles, François-Victor and Adèle. Their first child died in infancy.",
                fr: "Ils eurent cinq enfants : Léopold, Léopoldine, Charles, François-Victor et Adèle. Leur premier enfant mourut en bas âge."
              }
            }
          ],
          interestingFamilyFacts: [
            {
              en: "1. Victor's parents had different political beliefs. His father supported Napoleon, while his mother held royalist sympathies.",
              fr: "1. Les parents de Victor nourrissaient des convictions politiques opposées. Son père soutenait Napoléon, tandis que sa mère était royaliste."
            },
            {
              en: "2. His daughter Léopoldine died in a drowning accident in 1843, an event that deeply affected him.",
              fr: "2. Sa fille Léopoldine mourut tragiquement noyée en 1843, un événement qui le bouleversa à jamais."
            },
            {
              en: "3. His family experienced political exile when Victor opposed Napoleon III's regime.",
              fr: "3. Sa famille connut l'exil politique sur les îles anglo-normandes lorsque Victor s'opposa vigoureusement au régime de Napoléon III."
            },
            {
              en: "4. His daughter Adèle was interested in music and played the piano.",
              fr: "4. Sa fille cadette Adèle se passionnait pour la musique et jouait assidûment du piano."
            }
          ]
        },

        {
          id: "behind-flaubert",
          number: "4. Gustave Flaubert (1821–1880)",
          portrait: "assets/images/img_77.jpg",
          cardImage: "assets/images/img_80.jpg",
          fullName: "Gustave Flaubert",
          born: "12 December 1821",
          birthplace: "Rouen, France",
          knownFor: {
            en: "Realist novelist; author of Madame Bovary.",
            fr: "Romancier réaliste ; auteur de Madame Bovary."
          },
          familyBackgroundIntro: {
            en: "Gustave Flaubert was born into a comfortable middle-class family associated with the medical profession.",
            fr: "Gustave Flaubert est né au sein d'une famille bourgeoise aisée liée au milieu médical."
          },
          familyPoints: [
            {
              role: { en: "Father – Achille-Cléophas Flaubert:", fr: "Père – Achille-Cléophas Flaubert :" },
              desc: {
                en: "A respected surgeon who worked as chief surgeon at the Hôtel-Dieu hospital in Rouen.",
                fr: "Chirurgien réputé qui exerçait comme chirurgien en chef à l'Hôtel-Dieu de Rouen."
              }
            },
            {
              role: { en: "Mother – Caroline Fleuriot:", fr: "Mère – Caroline Fleuriot :" },
              desc: {
                en: "Came from Pont-Audemer in Normandy. She was closely involved in the family and Gustave's upbringing.",
                fr: "Originaire de Pont-Audemer en Normandie. Elle s'investit profondément dans le foyer et l'éducation de Gustave."
              }
            },
            {
              role: { en: "Elder brother – Achille Flaubert:", fr: "Frère aîné – Achille Flaubert :" },
              desc: {
                en: "Followed his father's path into medicine and became a doctor.",
                fr: "Suivit la voie paternelle dans la médecine et devint médecin à son tour."
              }
            },
            {
              role: { en: "Younger sister – Caroline Flaubert:", fr: "Sœur cadette – Caroline Flaubert :" },
              desc: {
                en: "Gustave was very affectionate towards his younger sister. They shared a close relationship.",
                fr: "Gustave vouait une immense tendresse à sa jeune sœur, avec laquelle il entretenait une grande complicité."
              }
            },
            {
              role: { en: "Marriage:", fr: "Mariage :" },
              desc: {
                en: "Gustave Flaubert never married and had no children.",
                fr: "Gustave Flaubert ne s'est jamais marié et n'a pas eu d'enfants."
              }
            }
          ],
          interestingFamilyFacts: [
            {
              en: "Childhood inside a hospital: Growing up in an apartment inside the Hôtel-Dieu hospital, Gustave would climb the garden trellis to peek into the dissection amphitheatre.",
              fr: "Enfance à l'Hôtel-Dieu : Vivant dans le pavillon de fonction de l'hôpital, Gustave grimpait aux treilles pour observer les dissections dans l'amphithéâtre anatomique de son père."
            },
            {
              en: "Grief for his sister Caroline: Her sudden death in 1846 shortly after giving birth shattered him; he raised her orphaned baby daughter with maternal devotion.",
              fr: "Le deuil de Caroline : La mort précoce de sa sœur en 1846 après son accouchement le marqua d'une peine inguérissable ; il prit en charge l'éducation de sa nièce orpheline."
            },
            {
              en: "Hermit of Croisset: He preferred solitude at the family riverside manor at Croisset, dedicating decades to finding 'le mot juste' (the perfect word) away from Parisian society.",
              fr: "L'Ermite de Croisset : Il préféra l'isolement du domaine familial de Croisset au bord de la Seine, vouant ses nuits à la recherche maniaque du « mot juste »."
            }
          ]
        },

        {
          id: "behind-voltaire",
          number: "5. Voltaire (1694–1778)",
          portrait: "assets/images/img_83.jpg",
          cardImage: "assets/images/img_86.jpg",
          fullName: "François-Marie Arouet (known as Voltaire)",
          born: "21 November 1694",
          birthplace: "Paris, France",
          knownFor: {
            en: "Enlightenment philosopher, writer, poet and satirist.",
            fr: "Philosophe des Lumières, écrivain, poète et satiriste."
          },
          familyBackgroundIntro: {
            en: "Voltaire was born into a financially comfortable bourgeois family. His family belonged to the professional and administrative class of French society.",
            fr: "Voltaire est né dans une famille bourgeoise aisée, appartenant au corps juridique et administratif de la société française."
          },
          familyPoints: [
            {
              role: { en: "Father – François Arouet:", fr: "Père – François Arouet :" },
              desc: {
                en: "A lawyer and government official who wanted his son to pursue a respectable professional career, particularly law.",
                fr: "Notaire et receveur des épices à la Chambre des comptes, qui souhaitait ardemment que son fils embrasse une carrière juridique."
              }
            },
            {
              role: { en: "Mother – Marie-Marguerite Daumard:", fr: "Mère – Marie-Marguerite Daumard :" },
              desc: {
                en: "Came from a family with aristocratic connections.",
                fr: "Issue d'une lignée liée à la petite noblesse et au milieu parlementaire."
              }
            },
            {
              role: { en: "Siblings:", fr: "Fratrie :" },
              desc: {
                en: "Voltaire was one of five surviving children. He was the youngest surviving son.",
                fr: "Voltaire était l'un des cinq enfants survivants, étant le benjamin des fils."
              }
            },
            {
              role: { en: "Marriage:", fr: "Mariage :" },
              desc: {
                en: "Voltaire never married.",
                fr: "Voltaire ne s'est jamais marié."
              }
            },
            {
              role: { en: "Children:", fr: "Enfants :" },
              desc: {
                en: "He had no children.",
                fr: "Il n'a pas eu d'enfants."
              }
            }
          ],
          interestingFamilyFacts: [
            {
              en: "Rebellion against his father: His father threatened to disown him unless he studied law, prompting François-Marie to adopt the biting anagram 'Voltaire' upon release from the Bastille.",
              fr: "Révolte paternelle : Son père le menaçait de déshéritement s'il ne devenait pas juriste ; en réaction, François-Marie forgea le pseudonyme frondeur de « Voltaire » à sa sortie de la Bastille."
            },
            {
              en: "Early maternal bereavement: His mother passed away when he was only seven years old, leaving him to be tutored by the freethinking Abbé de Châteauneuf.",
              fr: "Perte précoce de sa mère : Sa mère mourut alors qu'il n'avait que sept ans, et son parrain l'abbé de Châteauneuf l'initia très jeune au scepticisme et aux belles-lettres."
            },
            {
              en: "Intellectual partnership with Émilie: Though unwed, his life was transformed by his passionate sixteen-year alliance with the physicist Marquise Émilie du Châtelet at Cirey.",
              fr: "L'alliance avec Émilie du Châtelet : Bien que célibataire, il partagea seize années de complicité scientifique et amoureuse passionnée avec la grande mathématicienne au château de Cirey."
            }
          ]
        }
      ]
    },

    {
      id: "wing-personal-incidents",
      num: "V",
      title: {
        en: "How Personal Incidents Affect Literature",
        fr: "Comment les Drames Personnels Façonnent la Littérature"
      },
      tagline: {
        en: "Grief, Exile, and Oppression Transformed into Enduring Masterpieces",
        fr: "Le Deuil, l'Exil et l'Oppression Métamorphosés en Chefs-d'œuvre Éternels"
      },
      overviewImage: "assets/images/img_93.jpg",
      authors: [
        {
          id: "rec-author-1",
          author: "Recommended author 1: Victor Hugo (1802–1885)",
          portrait: "assets/images/img_96.jpg",
          focus: {
            en: "Focus: Personal loss, political exile, social injustice and compassion.",
            fr: "Axes majeurs : Deuil personnel, exil politique, injustice sociale et compassion."
          },
          mainWorks: {
            en: "Main works:\n• Les Misérables\n• Les Contemplations",
            fr: "Œuvres majeures :\n• Les Misérables\n• Les Contemplations"
          }
        },
        {
          id: "rec-author-2",
          author: "Recommended author 2: Voltaire (1694–1778)",
          portrait: "assets/images/img_99.jpg",
          focus: {
            en: "Focus: Imprisonment, exile, freedom of thought and criticism of society.",
            fr: "Axes majeurs : Emprisonnement, exil, liberté de pensée et critique sociétale."
          },
          mainWorks: {
            en: "Main works:\n• Candide\n• Letters Concerning the English Nation",
            fr: "Œuvres majeures :\n• Candide\n• Lettres philosophiques (Lettres anglaises)"
          }
        }
      ],
      connectionCard: {
        title: {
          en: "Connection between family and literature",
          fr: "Lien entre la sphère familiale et l'œuvre littéraire"
        },
        text: {
          en: "The loss of his daughter Léopoldine profoundly influenced his poetry. His collection Les Contemplations contains poems reflecting grief, memory, love and family relationships. His family experiences also help us understand the emotional depth of his writing.",
          fr: "La perte de sa fille Léopoldine a profondément bouleversé sa poésie. Son recueil Les Contemplations rassemble des poèmes méditant sur le deuil, la mémoire, l'amour et les liens familiaux. Ses épreuves intimes nous éclairent sur l'indicible profondeur émotionnelle de son œuvre."
        }
      },
      poemSection: {
        manuscriptImage: "assets/images/img_102.jpg",
        title: "Demain, dès l'aube… / Victor Hugo (1856)",
        originalFrench: `Demain, dès l'aube, à l'heure où blanchit la campagne,
Je partirai. Vois-tu, je sais que tu m'attends.
J'irai par la forêt, j'irai par la montagne.
Je ne puis demeurer loin de toi plus longtemps.

Je marcherai les yeux fixés sur mes pensées,
Sans rien voir au dehors, sans entendre aucun bruit,
Seul, inconnu, le dos courbé, les mains croisées,
Triste, et le jour pour moi sera comme la nuit.

Je ne regarderai ni l'or du soir qui tombe,
Ni les voiles au loin descendant vers Harfleur,
Et, quand j'arriverai, je mettrai sur ta tombe
Un bouquet de houx vert et de bruyère en fleur.`,
        englishTranslation: `Tomorrow, at dawn, when the countryside blanches white,
I shall depart. You see, I know you wait for me.
I will cross through the forest, I will cross mountain heights.
I can stay away from you no longer.

I will walk with my eyes fixed entirely on my thoughts,
Seeing nothing without, hearing no noise around,
Alone, unknown, my back bent, hands folded and caught,
Sad, and daytime for me will be as night profound.

I will not gaze upon the evening's falling gold,
Nor the sails far off descending toward Harfleur,
And when I arrive, upon your tomb I shall fold
A bouquet of green holly and heather in flower.`
      },
      contemplationsBreakdown: {
        title: "Les Contemplations – Victor Hugo (1856)",
        centralFigures: [
          {
            num: 1,
            title: { en: "1. The Poet:", fr: "1. Le Poète :" },
            desc: {
              en: "Victor Hugo himself, expressing his personal emotions, memories and reflections.",
              fr: "Victor Hugo lui-même, livrant ses émotions intimes, ses souvenirs et ses méditations."
            }
          },
          {
            num: 2,
            title: { en: "2. Léopoldine:", fr: "2. Léopoldine :" },
            desc: {
              en: "His beloved daughter, whose memory is central to many poems.",
              fr: "Sa fille chérie, dont le souvenir douloureux est au cœur de multiples poèmes."
            }
          },
          {
            num: 3,
            title: { en: "3. Nature:", fr: "3. La Nature :" },
            desc: {
              en: "Serves as a medium for expressing emotions and reflecting on human life.",
              fr: "Sert de miroir révélateur pour exprimer les sentiments et sonder la condition humaine."
            }
          }
        ],
        majorThemes: [
          { en: "Fatherly love and family relationships.", fr: "L'amour paternel et les liens de parenté." },
          { en: "Loss, grief and remembrance.", fr: "La perte, le deuil et le recueillement." },
          { en: "Life, death and spirituality.", fr: "La vie, la mort et l'élévation spirituelle." },
          { en: "Nature and human emotions.", fr: "La nature en résonance avec l'âme humaine." },
          { en: "Hope, memory and the passage of time.", fr: "L'espérance, la mémoire et la fuite du temps." }
        ]
      },
      comparisonTable: {
        image: "assets/images/img_105.jpg",
        title: {
          en: "Comparative Analysis: Victor Hugo vs. Voltaire",
          fr: "Tableau Comparatif : Victor Hugo vs. Voltaire"
        },
        headers: {
          col1: { en: "Comparison", fr: "Critère Comparatif" },
          col2: { en: "Victor Hugo", fr: "Victor Hugo" },
          col3: { en: "Voltaire", fr: "Voltaire" }
        },
        rows: [
          {
            category: { en: "Major life experience", fr: "Épreuve existentielle majeure" },
            hugo: { en: "Loss of daughter", fr: "Perte de sa fille" },
            voltaire: { en: "Imprisonment and exile", fr: "Emprisonnement et exil" }
          },
          {
            category: { en: "Work directly connected", fr: "Œuvre directement liée" },
            hugo: { en: "Les Contemplations", fr: "Les Contemplations" },
            voltaire: { en: "Letters Concerning the English Nation", fr: "Lettres concernant la nation anglaise (Lettres philosophiques)" }
          },
          {
            category: { en: "Form of expression", fr: "Forme d'expression" },
            hugo: { en: "Emotional poetry", fr: "Poésie lyrique et émotionnelle" },
            voltaire: { en: "Philosophical essays", fr: "Essais et contes philosophiques" }
          },
          {
            category: { en: "Central concern", fr: "Préoccupation centrale" },
            hugo: { en: "Love, grief and memory", fr: "Amour, deuil et mémoire" },
            voltaire: { en: "Freedom, reason and tolerance", fr: "Liberté, raison et tolérance" }
          },
          {
            category: { en: "Other famous work", fr: "Autre chef-d'œuvre marquant" },
            hugo: { en: "Les Misérables", fr: "Les Misérables" },
            voltaire: { en: "Candide", fr: "Candide" }
          },
          {
            category: { en: "Main message", fr: "Message universel" },
            hugo: { en: "Compassion and social justice", fr: "Compassion et justice sociale" },
            voltaire: { en: "Critical thinking and intellectual freedom", fr: "Pensée critique et émancipation intellectuelle" }
          }
        ]
      }
    },

    {
      id: "wing-works-recognition",
      num: "VI",
      title: {
        en: "Works and Recognition: Honours, Memorials and Legacies",
        fr: "Œuvres et Postérité : Honneurs, Mémoriaux et Héritages"
      },
      tagline: {
        en: "Why the World Continues to Read, Revere, and Commemorate These Masters",
        fr: "Pourquoi le Monde Continue de Lire, Vénérer et Célébrer ces Géants"
      },
      authors: [
        {
          id: "works-danielou",
          number: "1. Alain Daniélou (1907–1994)",
          cardImage: "assets/images/img_109.jpg",
          memorialImage: "assets/images/img_112.jpg",
          field: {
            en: "Field: Indian studies, musicology and cultural history.",
            fr: "Domaine : Études indiennes, musicologie et histoire culturelle."
          },
          legacy: {
            en: "Legacy: He introduced many international readers to Indian philosophy, music and culture through his French and English writings.",
            fr: "Héritage : Il a initié un vaste lectorat international à la philosophie, à la musique et à la culture indiennes par ses écrits en français et en anglais."
          },
          recognitionAndHonours: [
            {
              en: "Recognised internationally for his research into Indian music and Hindu traditions.",
              fr: "Reconnu sur le plan international pour ses recherches approfondies sur la musique indienne et les traditions hindoues."
            },
            {
              en: "Received recognition for his contribution to the understanding of Indian classical music and Sanskrit culture.",
              fr: "Honoré pour sa contribution décisive à l'intelligence de la musique classique indienne et de la culture sanskrite."
            }
          ],
          memorialsAndInstitutions: [
            {
              en: "The Alain Daniélou Foundation preserves and promotes his intellectual and cultural legacy.",
              fr: "La Fondation Alain Daniélou préserve et promeut son héritage intellectuel et culturel."
            },
            {
              en: "His writings remain important resources for researchers studying Indian traditions.",
              fr: "Ses ouvrages demeurent des références incontournables pour les chercheurs explorant les traditions de l'Inde."
            }
          ],
          whyPeopleStillStudy: [
            {
              en: "They provide a European scholar's perspective on Indian philosophy and culture.",
              fr: "Ils offrent le regard pénétrant d'un érudit européen immergé au cœur de la philosophie et de la culture indiennes."
            },
            {
              en: "They encourage intercultural understanding.",
              fr: "Ils favorisent un dialogue interculturel authentique et respectueux."
            },
            {
              en: "They connect music, religion, history and philosophy.",
              fr: "Ils tissent des passerelles vivantes entre musique, spiritualité, histoire et philosophie."
            }
          ]
        },

        {
          id: "works-tocqueville",
          number: "2. Alexis de Tocqueville (1805–1859)",
          cardImage: "assets/images/img_115.jpg",
          memorialImage: "assets/images/img_118.jpg",
          field: {
            en: "Field: Political philosophy, history and sociology.",
            fr: "Domaine : Philosophie politique, histoire et sociologie."
          },
          legacy: {
            en: "Legacy: He became one of the most influential thinkers on democracy and modern political society.",
            fr: "Héritage : Il s'est imposé comme l'un des penseurs les plus influents sur la démocratie et la société politique moderne."
          },
          recognitionAndHonours: [
            {
              en: "Elected to the Académie Française in 1841.",
              fr: "Élu à l'Académie française en 1841."
            },
            {
              en: "Recognised internationally for his influential book Democracy in America.",
              fr: "Consacré mondialement pour son traité visionnaire De la démocratie en Amérique."
            }
          ],
          memorialsAndInstitutions: [
            {
              en: "His former family château at Tocqueville in Normandy is associated with his historical legacy.",
              fr: "Le château familial de Tocqueville en Normandie perpétue son illustre souvenir historique."
            },
            {
              en: "His name is remembered in political studies and academic institutions.",
              fr: "Son nom est honoré et enseigné dans les plus prestigieuses facultés et chaires de sciences politiques."
            }
          ],
          whyPeopleStillRead: [
            {
              en: "He explains the relationship between democracy and individual freedom.",
              fr: "Il élucide magistralement les tensions fécondes entre égalité démocratique et liberté individuelle."
            },
            {
              en: "His observations about equality and political participation remain relevant.",
              fr: "Ses observations sur l'égalisation des conditions et la participation civique restent d'une brûlante actualité."
            },
            {
              en: "His work helps readers understand the strengths and challenges of democratic societies.",
              fr: "Son œuvre donne des clés incomparables pour sonder les forces et les vulnérabilités de nos sociétés démocratiques."
            }
          ]
        },

        {
          id: "works-hugo",
          number: "3. Victor Hugo (1802–1885)",
          cardImage: "assets/images/img_121.jpg",
          memorialImage: "assets/images/img_124.jpg",
          field: {
            en: "Field: Poetry, novels and drama.",
            fr: "Domaine : Poésie, roman et théâtre."
          },
          legacy: {
            en: "Legacy: One of the greatest figures of French Romanticism, remembered for his literary achievements and commitment to social justice.",
            fr: "Héritage : L'une des figures les plus éblouissantes du romantisme français, immortalisé par ses triomphes littéraires et son combat inlassable pour la justice sociale."
          },
          recognitionAndHonours: [
            {
              en: "Received the French Legion of Honour.",
              fr: "Fait chevalier puis officier de la Légion d'honneur."
            },
            {
              en: "Elected to the Académie Française in 1841.",
              fr: "Élu à l'Académie française au fauteuil 14 en 1841."
            },
            {
              en: "Given a grand national funeral in 1885.",
              fr: "Salue par des funérailles nationales monumentales rassemblant plus de deux millions de personnes en 1885."
            },
            {
              en: "His remains were transferred to the Panthéon in Paris.",
              fr: "Sa dépouille fut transférée dans la crypte du Panthéon de Paris."
            }
          ],
          memorialsAndMonuments: [
            {
              en: "Maison de Victor Hugo, Paris: A museum in the house where he lived from 1832 to 1848. It opened in 1903.",
              fr: "Maison de Victor Hugo, Place des Vosges à Paris : Musée installé dans l'appartement où il résida de 1832 à 1848, inauguré en 1903."
            },
            {
              en: "Panthéon, Paris: His final resting place, honouring his national contribution.",
              fr: "Panthéon, Paris : Son ultime tombeau sous l'inscription « Aux grands hommes, la patrie reconnaissante »."
            },
            {
              en: "Numerous streets, schools and monuments across France bear his name.",
              fr: "D'innombrables avenues, lycées, théâtres et monuments portent son nom à travers toute la France."
            }
          ],
          whyPeopleStillRead: [
            {
              en: "Les Misérables explores poverty, justice and human compassion.",
              fr: "Les Misérables sonde les abîmes de la misère, l'iniquité de la justice et la rédemption par la compassion."
            },
            {
              en: "The Hunchback of Notre-Dame highlights society, human dignity and prejudice.",
              fr: "Notre-Dame de Paris exalte la dignité humaine, la splendeur gothique et la dénonciation des préjugés sociaux."
            },
            {
              en: "His poetry expresses universal emotions such as love, grief and hope.",
              fr: "Sa poésie donne une voix intemporelle aux passions universelles : l'amour, l'affliction et l'espérance."
            }
          ]
        },

        {
          id: "works-flaubert",
          number: "4. Gustave Flaubert (1821–1880)",
          cardImage: "assets/images/img_128.jpg",
          memorialImage: "assets/images/img_131.jpg",
          field: {
            en: "Field: Realist literature and novels.",
            fr: "Domaine : Littérature réaliste et roman."
          },
          legacy: {
            en: "Legacy: Remembered for his precise writing style and major contribution to literary realism.",
            fr: "Héritage : Passé à la postérité pour l'exigence chirurgicale de son style et sa contribution fondatrice au réalisme moderne."
          },
          recognitionAndHonours: [
            {
              en: "Recognised as one of the most influential French novelists of the nineteenth century.",
              fr: "Reconnu comme l'un des romanciers français les plus déterminants du XIXe siècle."
            },
            {
              en: "His novel Madame Bovary became a landmark in realist fiction.",
              fr: "Son chef-d'œuvre Madame Bovary est devenu un jalon absolu de la fiction réaliste universelle."
            },
            {
              en: "His literary techniques influenced generations of novelists.",
              fr: "Ses techniques narratives et le style indirect libre ont façonné des générations d'écrivains."
            }
          ],
          memorialsAndMonuments: [
            {
              en: "Musée Flaubert et d'Histoire de la Médecine, Rouen: Dedicated to preserving his memory and the history of medicine.",
              fr: "Musée Flaubert et d'Histoire de la Médecine, Rouen : Dédié à la mémoire de l'écrivain et aux collections médicales de son père."
            },
            {
              en: "Croisset: The place near Rouen where he lived and wrote many of his works.",
              fr: "Croisset : Pavillon historique en bord de Seine où il passa sa vie à écrire ses chefs-d'œuvre."
            },
            {
              en: "His birthplace and historical connections with Rouen remain important literary heritage sites.",
              fr: "Sa maison natale et ses attaches rouennaises constituent un haut lieu du patrimoine littéraire national."
            }
          ],
          whyPeopleStillRead: [
            {
              en: "Madame Bovary explores human desires, relationships and dissatisfaction.",
              fr: "Madame Bovary explore avec une lucidité impitoyable le vertige des désirs chimériques et l'insatisfaction intime."
            },
            {
              en: "His writing provides a detailed picture of nineteenth-century society.",
              fr: "Ses récits composent une radiographie d'une précision microscopique de la bourgeoisie provinciale et parisienne."
            },
            {
              en: "His careful use of language remains an important subject in literary studies.",
              fr: "Le culte maniaque de la prose et la musicalité du « gueuloir » demeurent des modèles inégalés pour la stylistique."
            }
          ]
        },

        {
          id: "works-voltaire",
          number: "5. Voltaire (1694–1778)",
          cardImage: "assets/images/img_134.jpg",
          memorialImage: "assets/images/img_137.jpg",
          field: {
            en: "Field: Philosophy, satire, poetry and history.",
            fr: "Domaine : Philosophie, satire, poésie et histoire."
          },
          legacy: {
            en: "Legacy: One of the most influential intellectual figures of the European Enlightenment.",
            fr: "Héritage : L'une des figures intellectuelles les plus souveraines et rayonnantes des Lumières européennes."
          },
          recognitionAndHonours: [
            {
              en: "Elected to the Académie Française in 1746.",
              fr: "Élu à l'Académie française en 1746."
            },
            {
              en: "Celebrated as a major intellectual figure when he returned to Paris in 1778.",
              fr: "Triomphalement fêté et couronné à la Comédie-Française lors de son retour apothéotique à Paris en 1778."
            },
            {
              en: "His remains were transferred to the Panthéon in 1791.",
              fr: "Ses cendres furent panthéonisées en grande pompe le 11 juillet 1791 au cours de la Révolution française."
            }
          ],
          memorialsAndMonuments: [
            {
              en: "Panthéon, Paris: His final resting place.",
              fr: "Panthéon, Paris : Son tombeau solennel faisant face à celui de Jean-Jacques Rousseau."
            },
            {
              en: "Château de Ferney: His former residence, now a historical site and museum.",
              fr: "Château de Ferney : Son domaine d'exil aux portes de Genève, aujourd'hui monument national et musée."
            },
            {
              en: "Voltaire Foundation, University of Oxford: Preserves and studies his literary and philosophical works.",
              fr: "Fondation Voltaire, Université d'Oxford : Centre de recherche d'excellence publiant l'intégrale de ses écrits."
            }
          ],
          whyPeopleStillRead: [
            {
              en: "Candide encourages critical thinking and questions blind optimism.",
              fr: "Candide stimule l'esprit critique et pulvérise le fanatisme ainsi que l'optimisme béat."
            },
            {
              en: "His writings promote freedom of thought and religious tolerance.",
              fr: "Son Traité sur la tolérance défend indéfectiblement la liberté d'opinion et le pluralisme des croyances."
            },
            {
              en: "His criticism of injustice remains relevant to modern society.",
              fr: "Ses réquisitoires contre l'arbitraire judiciaire et le dogmatisme résonnent avec une force intacte aujourd'hui."
            }
          ]
        }
      ]
    },

    {
      id: "wing-recent-mentions",
      num: "VII",
      title: {
        en: "Recent Mentions of Authors: Modern Cultural Case Studies",
        fr: "Mentions Récentes des Auteurs : Études de Cas Contemporaines"
      },
      tagline: {
        en: "From Viral Tweets to the Olympic Stage: Historical Thought in the 21st Century",
        fr: "Des Tweets Viraux à la Scène Olympique : La Pensée Historique au XXIe Siècle"
      },
      cases: [
        {
          id: "case-voltaire-musk",
          author: "Voltaire",
          title: {
            en: "2. Voltaire – A Controversy Involving Elon Musk (2023)",
            fr: "2. Voltaire – Une Controverse Impliquant Elon Musk (2023)"
          },
          tag: {
            en: "International media controversy",
            fr: "Controverse médiatique internationale"
          },
          images: [
            "assets/images/img_141.jpg",
            "assets/images/img_144.jpg",
            "assets/images/img_147.jpg",
            "assets/images/img_150.jpg"
          ],
          whatHappened: {
            en: [
              "In May 2023, Elon Musk shared a social-media post attributing a controversial quotation to Voltaire.",
              'The quotation concerned the idea that people should question who has the power to control public criticism: "To learn who rules over you, simply find out who you are not allowed to criticize. - Voltaire"',
              "However, the attribution was incorrect.",
              "Fact-checkers established that the quotation did not originate with Voltaire. It was traced to a much later source associated with an extremist figure."
            ],
            fr: [
              "En mai 2023, Elon Musk a partagé sur les réseaux sociaux une publication attribuant une citation controversée à Voltaire.",
              'La citation affirmait que les citoyens devraient se méfier de ceux qu\'ils ne peuvent contester : « Pour savoir qui vous gouverne, découvrez simplement qui vous n\'avez pas le droit de critiquer. - Voltaire »',
              "Toutefois, cette attribution s'est avérée erronée.",
              "Les cellules de vérification des faits ont démontré que la citation n'a jamais été prononcée ni écrite par Voltaire. Elle provenait d'une publication moderne bien plus tardive liée à une mouvance extrémiste."
            ]
          },
          whyMentioned: {
            en: "Voltaire is historically associated with freedom of thought, criticism of authority and intellectual independence. His name is frequently attached to quotations about freedom of expression, sometimes incorrectly.",
            fr: "Voltaire est historiquement indissociable de la liberté de penser, de la remise en cause des dogmes et de l'indépendance d'esprit. Son nom est constamment convoqué pour cautionner des aphorismes sur la liberté d'expression, y compris de manière apocryphe."
          },
          projectSignificance: {
            en: "This incident demonstrates how historical philosophers continue to influence modern discussions about free speech and social media, even through incorrectly attributed quotations.",
            fr: "Cet incident illustre de façon éclatante la façon dont les philosophes des Lumières continuent d'aimanter les débats contemporains sur la liberté d'expression et les réseaux sociaux, quand bien même cela passe par des citations erronées."
          },
          source: {
            en: "Source: The Independent – Elon Musk tweets quote wrongly attributed to Voltaire (29 May 2023).",
            fr: "Source : The Independent – Elon Musk tweete une citation attribuée à tort à Voltaire (29 mai 2023)."
          },
          fullDetailText: {
            en: "Elon Musk shared a quote supposedly from French philosopher Voltaire on Saturday to make a joke about kids with leukemia. But the quote has frequently been debunked as something Voltaire never actually said. In reality, the quote is from a neo-Nazi who said it in 1993.",
            fr: "Elon Musk a partagé samedi une citation prétendument attribuée au philosophe français Voltaire pour ironiser sur des enfants atteints de leucémie. Or cette citation a été démentie à de nombreuses reprises comme apocryphe. En réalité, cette formule émane d'un militant néonazi qui l'a formulée en 1993."
          }
        },

        {
          id: "case-tocqueville-capitol",
          author: "Alexis de Tocqueville",
          title: {
            en: "3. Alexis de Tocqueville – Democracy debates after the Capitol attack (2021–2023, and 2026)",
            fr: "3. Alexis de Tocqueville – Débats sur la Démocratie après l'Attaque du Capitole (2021–2023 et 2026)"
          },
          tag: {
            en: "International political and intellectual relevance",
            fr: "Pertinence politique et intellectuelle internationale"
          },
          images: [
            "assets/images/img_154.jpg",
            "assets/images/img_157.jpg",
            "assets/images/img_160.jpg"
          ],
          whatHappened: {
            en: [
              "The 6 January 2021 attack on the US Capitol raised international questions about the strength of American democracy.",
              "Political thinkers and international commentators revisited Alexis de Tocqueville's famous book Democracy in America to understand democratic institutions, political divisions and the challenges facing democratic societies.",
              "A particularly relevant example is the Tocqueville Foundation's international discussion series:",
              "• 2021: The Future of Democracy in America.",
              "• 2022: The Russian Question – The West Facing Putin.",
              "• 2023: Tomorrow's Europe – Rearming Democracy.",
              "These discussions addressed democratic instability, geopolitical tensions and the future of democratic societies."
            ],
            fr: [
              "L'assaut du 6 janvier 2021 contre le Capitole des États-Unis a soulevé d'angoissantes interrogations internationales sur la résilience du modèle démocratique américain.",
              "Penseurs politiques et commentateurs internationaux se sont replongés dans le maître-livre d'Alexis de Tocqueville, De la démocratie en Amérique, pour analyser la fragilité des institutions, la polarisation civique et les écueils menaçant les démocraties.",
              "Un exemple hautement emblématique est le cycle international de conférences de la Fondation Tocqueville :",
              "• 2021 : L'avenir de la démocratie en Amérique.",
              "• 2022 : La question russe – L'Occident face à Poutine.",
              "• 2023 : L'Europe de demain – Réarmer la démocratie.",
              "Ces tribunes ont exploré la vulnérabilité démocratique, les séismes géopolitiques et le destin des sociétés ouvertes."
            ]
          },
          recent2026Example: {
            en: "A more recent example – November 2026: A 2 November 2026 opinion article in Le Monde explicitly revisited Tocqueville's Democracy in America to analyse contemporary American politics and the challenges facing liberal democracy.",
            fr: "Un exemple encore plus récent – Novembre 2026 : Une tribune d'opinion publiée le 2 novembre 2026 dans Le Monde a explicitement réexaminé De la démocratie en Amérique pour disséquer les dynamiques de la politique américaine actuelle et les périls guettant la démocratie libérale."
          },
          whyMentioned: {
            en: "Tocqueville studied democracy, equality, political participation and the relationship between citizens and government. His observations remain useful when analysing modern political developments.",
            fr: "Tocqueville a disséqué les rouages intimes de l'égalité, des passions égalitaires, de la participation citoyenne et du rapport à l'État. Ses intuitions offrent un prisme indispensable pour comprendre les convulsions politiques contemporaines."
          }
        },

        {
          id: "case-danielou-heritage",
          author: "Alain Daniélou",
          title: {
            en: "4. Alain Daniélou – International recognition of Indian cultural heritage (2022–2023)",
            fr: "4. Alain Daniélou – Reconnaissance Internationale du Patrimoine Culturel Indien (2022–2023)"
          },
          tag: {
            en: "Cultural and academic recognition",
            fr: "Reconnaissance culturelle et académique"
          },
          images: [
            "assets/images/img_163.jpg",
            "assets/images/img_166.jpg"
          ],
          whatHappened: {
            en: [
              "Alain Daniélou's contribution to Indian culture received renewed attention through international cultural publications and academic discussions.",
              "Two notable examples:",
              "• January 2022: The Alain Daniélou Foundation published a discussion titled From Indian-European to Transcultural: Reconsidering Alain Daniélou's Intellectual Legacy. It examined how his work could contribute to understanding cultural exchange in the modern world.",
              "• February 2023: Global Indian published an article titled Brittany to Benaras: The Journey of Alain Daniélou, highlighting his journey from France to India and his contribution to Indian music, philosophy and literature."
            ],
            fr: [
              "L'apport pionnier d'Alain Daniélou à la diffusion de la culture indienne a connu un regain d'intérêt spectaculaire à travers des parutions culturelles et colloques universitaires mondiaux.",
              "Deux jalons remarquables :",
              "• Janvier 2022 : La Fondation Alain Daniélou a organisé une table ronde intitulée « D'Indo-Européen à Transculturel : Réévaluer l'héritage intellectuel d'Alain Daniélou ». Elle examinait comment ses recherches fécondent les théories modernes du métissage culturel.",
              "• Février 2023 : La revue Global Indian a consacré un grand dossier intitulé « De la Bretagne à Bénarès : L'Odyssée d'Alain Daniélou », retraçant son parcours extraordinaire depuis la France jusqu'aux rives du Gange et sa mise en valeur de la musique et des écritures sanskrites."
            ]
          },
          whyMentioned: {
            en: "Daniélou helped introduce Indian classical music, Hindu philosophy and Indian literary traditions to international audiences. His work demonstrates that cultural contributions can cross national boundaries.",
            fr: "Daniélou a été l'un des premiers passeurs à révéler la musique classique indienne, les concepts védiques et la polyphonie littéraire de l'Inde aux publics internationaux. Son œuvre prouve que les créations spirituelles transcendent toutes les frontières nationales."
          }
        },

        {
          id: "case-hugo-olympics",
          author: "Victor Hugo",
          title: {
            en: "5. Victor Hugo – His work featured at the Paris Olympics (2024)",
            fr: "5. Victor Hugo – Son Œuvre Célébrée aux Jeux Olympiques de Paris (2024)"
          },
          tag: {
            en: "Major international cultural event",
            fr: "Événement culturel international majeur"
          },
          images: [
            "assets/images/img_170.jpg",
            "assets/images/img_173.jpg"
          ],
          whatHappened: {
            en: [
              "On 26 July 2024, the Paris Olympic Games opening ceremony celebrated French culture, history and artistic heritage.",
              "During the ceremony:",
              "• Performances referenced Victor Hugo's Les Misérables.",
              "• The story's characters and revolutionary atmosphere were presented through artistic performances along the Seine and at the Conciergerie with torchlight and dramatic tableaus."
            ],
            fr: [
              "Le 26 juillet 2024, la cérémonie d'ouverture grandiose des Jeux Olympiques de Paris a mis à l'honneur la culture, l'histoire et le patrimoine artistique français devant plus d'un milliard de téléspectateurs.",
              "Pendant la cérémonie :",
              "• Des tableaux spectaculaires ont rendu un hommage vibrant aux Misérables de Victor Hugo.",
              "• Les personnages mythiques (Gavroche, les insurgés) et le souffle révolutionnaire ont embrasé les façades de la Conciergerie à grand renfort de torches, de pyrotechnie tricolore et d'énergie musicale."
            ]
          },
          anotherRecognition2025: {
            en: "Another international recognition – 2025: In June 2025, The New Yorker published an article titled What Trump Missed at the Kennedy Center Production of Les Mis. It discussed a performance of the musical and examined how Hugo's story about social injustice and authoritarian power could be interpreted in contemporary political circumstances.",
            fr: "Autre retentissement mondial – 2025 : En juin 2025, la revue prestigieuse The New Yorker publiait un essai intitulé « Ce que Trump a manqué à la représentation des Misérables au Kennedy Center ». L'article analysait comment l'épopée hugolienne dénonçant la brutalité sociale et les tentations autoritaires garde une force incandescente dans l'arène politique moderne."
          },
          whyMentioned: {
            en: "Hugo's literature explores:\n• Freedom and equality.\n• Social injustice.\n• Human dignity.\n• Political oppression.\n• Compassion for disadvantaged people.",
            fr: "L'œuvre de Hugo incarne sans égal :\n• La liberté et l'égalité fraternelle.\n• La dénonciation de l'injustice sociale.\n• La dignité inaliénable de l'être humain.\n• La résistance à l'oppression despotique.\n• La compassion envers les plus démunis et les réprouvés."
          },
          projectSignificance: {
            en: "His literary legacy reached an international audience through the Paris Olympics and contemporary theatre discussions.",
            fr: "Son héritage littéraire et politique a conquis une audience planétaire à travers la vitrine universelle des Jeux Olympiques et les plus vibrants débats théâtraux contemporains."
          }
        }
      ]
    },

    {
      id: "wing-alive-today",
      num: "VIII",
      title: {
        en: 'Final Feature: "If These Authors Were Alive Today…"',
        fr: 'Apothéose : « S\'ils Étaient Parmi Nous Aujourd\'hui… »'
      },
      tagline: {
        en: "Five Existential Inquiries for the 21st Century",
        fr: "Cinq Questions Existentielles Posées au XXIe Siècle"
      },
      headerCardImage: "assets/images/img_176.jpg",
      intro: {
        en: 'Create a final feature called "If These Authors Were Alive Today..." Present questions such as:',
        fr: 'Créez une fonction finale intitulée « S\'ils Étaient Parmi Nous Aujourd\'hui... » Posez des questions telles que :'
      },
      dialogues: [
        {
          id: "q-voltaire",
          author: "Voltaire",
          question: {
            en: "What would Voltaire say about freedom of speech on social media?",
            fr: "Que dirait Voltaire de la liberté d'expression sur les réseaux sociaux ?"
          },
          reflection: {
            en: "Voltaire would champion open expression while fiercely denouncing algorithmic dogmatism and the spread of unverified falsehoods. He would remind us that true wit serves truth, that liberty without critical reason degenerates into tribal fury, and that we must cultivate our common intellectual garden against modern fanatics.",
            fr: "Voltaire applaudirait l'accès de chacun à la tribune publique tout en fustigeant la tyrannie des algorithmes et la prolifération de fake news calomnieuses. Il rappellerait que l'ironie doit servir la lumière, que la liberté sans examen rationnel tourne au fanatisme grégaire, et qu'il faut plus que jamais « cultiver notre jardin » critique."
          }
        },
        {
          id: "q-hugo",
          author: "Victor Hugo",
          question: {
            en: "What would Victor Hugo write about poverty in modern cities?",
            fr: "Que dénoncerait Victor Hugo face à la pauvreté dans nos métropoles modernes ?"
          },
          reflection: {
            en: "Hugo would march beside the homeless, migrant families, and marginalized youth on metropolitan peripheries. He would proclaim in thunderous prose that extreme wealth existing alongside desolate poverty is the shame of civilization, and that true progress is measured by how a society protects its most vulnerable souls.",
            fr: "Hugo prendrait la plume pour les sans-abris, les réfugiés et les oubliés des banlieues urbaines. D'une voix de stentor, il clamerait que l'opulence insolente côtoyant le dénuement extrême est le scandale de la civilisation, rappelant que « tant qu'il y aura sur la terre ignorance et misère », la poésie a le devoir d'être un cri de révolte."
          }
        },
        {
          id: "q-tocqueville",
          author: "Alexis de Tocqueville",
          question: {
            en: "What would Tocqueville think about modern democracy?",
            fr: "Quel regard Tocqueville porterait-il sur l'état de nos démocraties modernes ?"
          },
          reflection: {
            en: "Tocqueville would warn against the soft despotism of hyper-individualism and polarized echo chambers that erode civic engagement. He would observe how anxiety over equality can paradoxically lead citizens to surrender their liberty to demagogues, urging a revitalized spirit of local democratic association.",
            fr: "Tocqueville s'inquiéterait de l'hyper-individualisme atomisant les citoyens et des chambres d'écho polarisées détruisant le compromis civique. Il soulignerait que l'angoisse du déclassement pousse parfois les peuples à sacrifier la liberté politique au profit d'un despotisme doux et tutélaire, et appellerait à revivifier d'urgence le tissu associatif."
          }
        },
        {
          id: "q-flaubert",
          author: "Gustave Flaubert",
          question: {
            en: "How would Flaubert describe modern society?",
            fr: "Comment Flaubert décrirait-il la société du spectacle contemporaine ?"
          },
          reflection: {
            en: "Flaubert would cast a blistering, surgical eye upon influencer culture, compulsive digital self-curation, and consumer illusions—the ultimate manifestation of 'Bovarysm'. He would compile a scathing contemporary 'Dictionary of Received Ideas' skewering corporate jargon and performative virtue.",
            fr: "Flaubert disséquerait avec une précision chirurgicale et un rire amer le culte des apparences sur Instagram, les chimères consuméristes et le bévue généralisé — quintessence du « bovarysme » à l'ère numérique. Il rédigerait un féroce « Dictionnaire des idées reçues 2.0 » épinglant le jargon managérial et les postures vertueuses de façade."
          }
        },
        {
          id: "q-danielou",
          author: "Alain Daniélou",
          question: {
            en: "How would Alain Daniélou interpret today's cultural exchange?",
            fr: "Comment Alain Daniélou interpréterait-il les échanges culturels d'aujourd'hui ?"
          },
          reflection: {
            en: "Daniélou would celebrate global musical fusion and direct digital access to sacred wisdom traditions, while warning against superficial consumer appropriation. He would advocate for deep, respectful immersion that honors the ancient metaphysical roots of non-Western civilisations.",
            fr: "Daniélou saluerait la fluidité mondiale des métissages sonores et la découverte des spiritualités traditionnelles, tout en mettant en garde contre le pillage superficiel ou l'uniformisation marchande. Il plaiderait pour une initiation humble et exigeante, seule capable de faire entendre la voix sacrée des civilisations plurimillénaires."
          }
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRESENTATION_DATA;
}
