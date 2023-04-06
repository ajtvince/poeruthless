import React from 'react';
import { useState, useEffect } from 'react';
import './stylesheets/LeagueContent.css';
//show league content that is in ruthless and info

export default function LeagueContent() {

  return(
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Specific League Content</div>
      <div id='leagueContentContainer'>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
            <div className='contentDescTitle'>Abysses</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Abyss chests do not always contain Abyss Jewels<br/>
                - Stygian Spires have ~25% to drop a Sygian Vise<br />
                - Liches do not guarantee an Abyss unique or Stygian Vise drop
              </p>
            </div></div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Beastiary</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Beastcrafting rewards have been completely reworked<br/>
                - Rewards now include Talismans, Flask Enchants, and other niche crafts: <a href='https://www.poewiki.net/wiki/Beastcrafting_(Ruthless)'>Wiki</a>
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Betrayal</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Syndicate missions no longer provide veiled items as rewards<br/>
                - Only unique items can be veiled<br/>
                - Safehouses(Transportation, Fortification, Research, Intervention) rewards have been reworked
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Beyond</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Minimal changes
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
            <div className='contentDescTitle'>Blights</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Blights only contain generic chest (no icons)<br/>
                - Chests will only drop Oils and Blighted maps sometimes<br/>
                - Blighted maps do not drop oils
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Breaches</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Minimal changes
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Delirium</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Delirium is currently the only way to get cluster jewels in ruthless league
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Delve</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Loot is more likely to be Azurite/Resonators rather than item chests<br/>
                - Chaotic Resonators have been replaced by Alchemical Resonators
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Essences</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Essences do not spawn naturally (must allocate Atlas passive to spawn)
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Expedition</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Most buff effects have been removed (25% Increased Pack Size, 50% Increased Quantity of Artifcats, and 60% Increased Experience remain)<br/>
                - Vendors are significantly more expensive
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Harbingers</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Drops solely these shards at area levels 68+ (Horizons, Harbringers, Ancient, Annulment, Fracturing)<br/>
                - Drops generic currency shards at lower levels
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Harvest</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Harvest crafts have been reduced and changed. See more: <a href='https://www.poewiki.net/wiki/List_of_harvest_crafting_options#Ruthless_mode' >Wiki</a>
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Heist</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Blueprint Curio Displays contain 2 or 3 each of alternate quality gems and Replica uniques<br/>
                - Rogue equipment, Experimented base types, and Tailoring/Tempering Orbs are disabled
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Incursions</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Area level of the temple is equal to the average of all your incursions<br/>
                - Tier 3 Room special chests can contain sacrifice fragments(one of the only ways to obtain fragments)
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Legion</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - No longer drop incubators
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Metamorph</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Metamorphs in maps have only catalysts as a possible reward 
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Ritual</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Rewards significantly reduced and cost of items is more expensive
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Rogue Exiles</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Rogue Exiles only drop a full set of jewellery.<br/>
                - Spawn rate decreased <br/>
                - Start appearing in Act 4
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Shrines</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Spawn rate decreased/reduced rewards <br/>
                - Shrines start spawning in the middle of Act 1
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Strongboxes</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Spawn rate decreased/reduced rewards <br/>
                - Strongboxes start spawning in Act 3
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Tormented Spirits</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Spawn rate decreased/reduced rewards <br/>
                - Spirits start spawning in Act 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}