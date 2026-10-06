'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' :
                                            'id="xs-controllers-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' :
                                        'id="xs-injectables-links-module-AppModule-d436df2237a42b26eaffbe81f76595be0014dce07b36ddab1c9ec74525b515d74ef6b8205fadc8831bace30ae472ef31306949e2a782724d8e28dabdb93b49a1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' :
                                            'id="xs-controllers-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' :
                                        'id="xs-injectables-links-module-AuthModule-602aa152745895f8e5229db127f182a08e712bb65028b4be877fb692b13cfbb8344dbc3045d299ddcb4cb72f67d53c1dd36efe8e7a7ba144528be682162ad18c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MedicosModule.html" data-type="entity-link" >MedicosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' : 'data-bs-target="#xs-controllers-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' :
                                            'id="xs-controllers-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' }>
                                            <li class="link">
                                                <a href="controllers/MedicosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' : 'data-bs-target="#xs-injectables-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' :
                                        'id="xs-injectables-links-module-MedicosModule-123f874fb4feb0b6d7d24ed94928faa7754395f2dceb4e3976f660d4254bcb659aff29cdd29cfb7807167c7900396e0cb9910304ed28e7f3cf5662ec23d45a1f"' }>
                                        <li class="link">
                                            <a href="injectables/MedicosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservasModule.html" data-type="entity-link" >ReservasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' : 'data-bs-target="#xs-controllers-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' :
                                            'id="xs-controllers-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' }>
                                            <li class="link">
                                                <a href="controllers/ReservasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' : 'data-bs-target="#xs-injectables-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' :
                                        'id="xs-injectables-links-module-ReservasModule-a47472b1acb40b2e6a6403b96cc80615cf558aca6faea9c2f5608e27678479d61b855401f01a10a70836b10975ee064b629b1091198653639ff243d09ad4ddbb"' }>
                                        <li class="link">
                                            <a href="injectables/ReservasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuariosModule.html" data-type="entity-link" >UsuariosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' : 'data-bs-target="#xs-controllers-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' :
                                            'id="xs-controllers-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' }>
                                            <li class="link">
                                                <a href="controllers/UsuariosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' : 'data-bs-target="#xs-injectables-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' :
                                        'id="xs-injectables-links-module-UsuariosModule-88f7137923432a82e5b27496d44ff779ee5bf89cd1adab84eb0ffa33e3dc3487df28742f8b59c0431fecd09d898c875b58d41f1284f56293840715d47df70ce4"' }>
                                        <li class="link">
                                            <a href="injectables/UsuariosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MedicosController.html" data-type="entity-link" >MedicosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReservasController.html" data-type="entity-link" >ReservasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsuariosController.html" data-type="entity-link" >UsuariosController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Medico.html" data-type="entity-link" >Medico</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Reserva.html" data-type="entity-link" >Reserva</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Usuario.html" data-type="entity-link" >Usuario</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActualizarEstadoReservaDto.html" data-type="entity-link" >ActualizarEstadoReservaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActualizarValorConsultaDto.html" data-type="entity-link" >ActualizarValorConsultaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrearReservaDto.html" data-type="entity-link" >CrearReservaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReservaResponseDto.html" data-type="entity-link" >ReservaResponseDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicosService.html" data-type="entity-link" >MedicosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReservasService.html" data-type="entity-link" >ReservasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosService.html" data-type="entity-link" >UsuariosService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
