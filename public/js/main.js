// Pega o ano atual e escreve no elemento
const year = document.getElementById('year');
var d = new Date();
const fullYear = d.getFullYear();
year.innerText = fullYear;

// Medidor de Tempo de Carregamento
function loadPageTime() {
    const startTime = performance.now();
    const duration = performance.now() - startTime;
    console.log(`A página foi completamente carregada em ${duration}ms`);
}
loadPageTime();

// Controle da lib de auto typed
var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 30
});

AOS.init({
    // Configurações:
    disable: false, // aceita os seguintes valores: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // nome do evento despachado no documento, no qual o AOS deve inicializar
    initClassName: 'aos-init', // classe aplicada após a inicialização
    animatedClassName: 'aos-animate', // classe aplicada na animação
    useClassNames: false, // se verdadeiro, adicionará conteúdo de `data-aos` como classes no scroll
    disableMutationObserver: false, // desabilita as detecções automáticas de mutações (avançado)
    debounceDelay: 100, // o atraso no debounce usado ao redimensionar a janela (avançado)
    throttleDelay: 99, // o atraso no acelerador usado ao rolar a página (avançado)

    // Configurações que podem ser substituídas por elemento, por atributos `data-aos-*`:
    offset: 180, // deslocamento (em px) do ponto de disparo original
    delay: 100, // valores de 0 a 3000, com passo 50ms
    duration: 1200, // valores de 0 a 3000, com passo 50ms
    easing: 'ease', // easing padrão para animações AOS
    once: false, // se a animação deve acontecer apenas uma vez - enquanto rola para baixo
    mirror: false, // se os elementos devem ser animados ao passar por eles
    anchorPlacement: 'top-bottom' // define qual posição do elemento em relação à janela deve acionar a animação
});