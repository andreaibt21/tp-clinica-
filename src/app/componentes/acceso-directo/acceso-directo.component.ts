import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import firebase from 'firebase/compat/app';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-acceso-directo',
  templateUrl: './acceso-directo.component.html',
  styleUrls: ['./acceso-directo.component.scss']
})
export class AccesoDirectoComponent implements OnInit {

  @Output() user = new EventEmitter<string>();
  constructor(public storage: StorageService) { }
  public users = [

                  'dwmdnyaccdwzqbqsmc@ckptr.com',  //pac 1
                  'rjwbrzlgjvguxxfrdc@ckptr.com', //pac 2
                  'bijbxbpgfxmucntjte@cwmxc.com',  //pac 3
                  'eicahavgeqlqxbkron@cazlq.com',  //esp 1
                  'yrnnjcrwrlmpcxcxqq@cazlg.com', //esp 2
                  '16-10152@usb.ve'   //admin
                  ]
  public imagenes = ['https://firebasestorage.googleapis.com/v0/b/clinica-tp-utn.appspot.com/o/images%2Fdwmdnyaccdwzqbqsmc%40ckptr.com%2F1699809488046?alt=media&token=42e6b407-a9b9-4db1-b5ec-59e684ece29d',
                     'https://firebasestorage.googleapis.com/v0/b/clinica-tp-utn.appspot.com/o/images%2Frjwbrzlgjvguxxfrdc%40ckptr.com%2F1699817185394?alt=media&token=273a46b5-ad2f-4e6f-bba6-f11b36f179b8',
                     'https://firebasestorage.googleapis.com/v0/b/clinica-tp-utn.appspot.com/o/images%2Fbijbxbpgfxmucntjte%40cwmxc.com%2F1699830615620?alt=media&token=87f42cbe-044e-464b-80e9-bb1f05da7732',
                     'https://firebasestorage.googleapis.com/v0/b/clinica-tp-utn.appspot.com/o/images%2Feicahavgeqlqxbkron%40cazlq.com%2F1699812163803?alt=media&token=66845f9a-ac27-41a2-8a97-e53d8f74ae16',
                     'https://firebasestorage.googleapis.com/v0/b/clinica-tp-utn.appspot.com/o/images%2Fyrnnjcrwrlmpcxcxqq%40cazlg.com%2F1699826816816?alt=media&token=1fb07eb4-1719-494b-99e5-6f2b1944aa79',
                     'https://firebasestorage.googleapis.com/v0/b/clinica-tp-utn.appspot.com/o/images%2F16-10152%40usb.ve%2Fadmin.png?alt=media&token=38aed232-8f96-49fa-a73d-680f116a5911'
                    ]

  ngOnInit() {
    this.storage.getImagenes(this.users);
  }

  logUser(user: string)
  {
  //  console.log(this.users);
   // console.log(user);
    this.user.emit(user);
  }
}
