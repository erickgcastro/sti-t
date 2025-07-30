
package com.erickgcastro.application.usecases;

import com.erickgcastro.domain.entities.Usuario;
import com.erickgcastro.domain.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class BuscarUsuarioPorIdUseCase {
    
    private final UsuarioRepository usuarioRepository;
    
    @Autowired
    public BuscarUsuarioPorIdUseCase(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    
    public Optional<Usuario> executar(Long id) {
        return usuarioRepository.findById(id);
    }
}
