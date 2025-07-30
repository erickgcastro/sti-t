
package com.erickgcastro.presentation.controllers;

import com.erickgcastro.application.usecases.*;
import com.erickgcastro.domain.entities.Usuario;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    private final CriarUsuarioUseCase criarUsuarioUseCase;
    private final ListarUsuariosUseCase listarUsuariosUseCase;
    private final BuscarUsuarioPorIdUseCase buscarUsuarioPorIdUseCase;
    private final AtualizarUsuarioUseCase atualizarUsuarioUseCase;
    private final DeletarUsuarioUseCase deletarUsuarioUseCase;
    
    @Autowired
    public UsuarioController(
            CriarUsuarioUseCase criarUsuarioUseCase,
            ListarUsuariosUseCase listarUsuariosUseCase,
            BuscarUsuarioPorIdUseCase buscarUsuarioPorIdUseCase,
            AtualizarUsuarioUseCase atualizarUsuarioUseCase,
            DeletarUsuarioUseCase deletarUsuarioUseCase) {
        this.criarUsuarioUseCase = criarUsuarioUseCase;
        this.listarUsuariosUseCase = listarUsuariosUseCase;
        this.buscarUsuarioPorIdUseCase = buscarUsuarioPorIdUseCase;
        this.atualizarUsuarioUseCase = atualizarUsuarioUseCase;
        this.deletarUsuarioUseCase = deletarUsuarioUseCase;
    }
    
    @PostMapping
    public ResponseEntity<?> criarUsuario(@Valid @RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = criarUsuarioUseCase.executar(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }
    
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return listarUsuariosUseCase.executar();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarUsuario(@PathVariable Long id) {
        Optional<Usuario> usuario = buscarUsuarioPorIdUseCase.executar(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        try {
            Usuario usuarioAtualizado = atualizarUsuarioUseCase.executar(id, usuario);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Long id) {
        try {
            deletarUsuarioUseCase.executar(id);
            return ResponseEntity.ok().body("Usuário deletado com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }
}
