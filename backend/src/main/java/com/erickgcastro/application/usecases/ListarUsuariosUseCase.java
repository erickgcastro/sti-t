
package com.erickgcastro.application.usecases;

import com.erickgcastro.domain.entities.Usuario;
import com.erickgcastro.domain.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ListarUsuariosUseCase {
    
    private final UsuarioRepository usuarioRepository;
    
    @Autowired
    public ListarUsuariosUseCase(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    
    public List<Usuario> executar() {
        return usuarioRepository.findAll();
    }
}
