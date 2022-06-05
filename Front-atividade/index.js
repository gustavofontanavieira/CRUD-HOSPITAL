const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
	res.render('index');
});


/* ================================================ ESPECIALIDADE ================================================= */
app.get('/especialidade', (req, res)=>{
	
	res.render('especialidade/index.ejs');
});

app.get('/listagemEspecialidades', (req, res)=>{
	const urlListarEspecialidade = 'http://localhost:3000/especialidade/listarEspecialidades';
	axios.get(urlListarEspecialidade)
		.then((response)=>{
			let especialidades = response.data;
			res.render('especialidade/listagemEspecialidade.ejs',{especialidades});
		});
});

app.post('/editarEspecialidade', (req, res) => {
	const urlEditarEspecialidade = `http://localhost:3000/especialidade/alterarEspecialidade`
	axios.put(urlEditarEspecialidade, req.body)
	.then(() => {
		res.redirect("http://localhost:3001/listagemEspecialidades")
	})
	.catch((err) => err.message)
})

app.get('/editarEspecialidade/:id', (req, res) => {
	let {id} = req.params;	
	const urlSelecionarEspecialidadeID = `http://localhost:3000/especialidade/listarEspecialidade/${id}`

	axios.get(urlSelecionarEspecialidadeID)
	.then((response) => {
		let especialidade = response.data;
		res.render('especialidade/EditarEspecialidade.ejs', {especialidade})
	})
})

/* ================================================================================================================ */

/* ================================================ MÉDICO ================================================= */

app.get('/medico', (req, res)=>{
	const urlListarEspecialidade = 'http://localhost:3000/especialidade/listarEspecialidades';
	axios.get(urlListarEspecialidade)
		.then((response)=>{
			let especialidades = response.data;
			res.render('medico/index.ejs',{especialidades});
		});
});

app.get('/listagemMedicos', (req, res)=>{
	const urlListarMedicos = 'http://localhost:3000/medico/listarMedicos';
	axios.get(urlListarMedicos)
		.then((response)=>{
			let medicos = response.data;
			const urlListarEspecialidade = 'http://localhost:3000/especialidade/listarEspecialidades';
			axios.get(urlListarEspecialidade)
			.then((response)=>{
			let especialidades = response.data;
			res.render('medico/listagemMedico.ejs',{especialidades, medicos});
		});
		}).catch(err => console.log(err.message))
});

app.post('/editarMedico', (req, res) => {
	const urlEditarMedico = `http://localhost:3000/medico/alterarMedico`
	axios.put(urlEditarMedico, req.body)
	.then(() => {
		res.redirect("http://localhost:3001/listagemMedicos")
	})
	.catch((err) => err.message)
})

app.get('/editarMedico/:id', (req, res) => {
	let {id} = req.params;	
	const urlSelecionarMedico = `http://localhost:3000/medico/listarMedico/${id}`
	axios.get(urlSelecionarMedico)
	.then((response) => {
		let medico = response.data;
		const urlListarEspecialidade = 'http://localhost:3000/especialidade/listarEspecialidades';
			axios.get(urlListarEspecialidade)
			.then((response)=>{
			let especialidades = response.data;
			res.render('medico/editarMedico.ejs',{especialidades, medico});
	})
	})	
})

app.get('/excluirMedico/:id', (req, res) => {
	let {id} = req.params;
	const urlExcluirMedico = `http://localhost:3000/medico/excluirMedico/${id}`
	axios.delete(urlExcluirMedico)
	.then(
		(response) => {
			console.log(response)
			res.redirect("http://localhost:3001/listagemMedicos")
		}
	).catch( error => console.log(error.message))
})



app.listen(3001, ()=>{
	console.log('SERVIDOR FRONT-END RODANDO EM http://localhost:3001');
});